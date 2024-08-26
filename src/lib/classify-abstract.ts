import { db } from '@/lib/db';
import { generateEmbedding } from '@/lib/generate-embedding';

export interface ClassificationResult {
	keyword: string;
	target_name: string;
	goal_name: string;
	similarity: number;
}
export async function classifyAbstract(
	abstract: string,
	similarityThreshold = 0.1
): Promise<ClassificationResult[]> {
	const abstractEmbedding = await generateEmbedding(abstract);
	const abstractEmbeddingString = `[${abstractEmbedding.join(',')}]`;

	const { rows: results } = await db.sql<ClassificationResult>`
    WITH abstract_embedding AS (
      SELECT ${abstractEmbeddingString}::vector AS embedding
    )
    SELECT k.keyword, t.name AS target_name, g.name AS goal_name,
           (1 - (i.embedding <=> abstract_embedding.embedding))::float AS similarity
    FROM keywords k
    JOIN targets t ON k.target_id = t.id
    JOIN goals g ON t.goal_id = g.id
    JOIN items i ON i.content = k.keyword
    CROSS JOIN abstract_embedding
    WHERE (1 - (i.embedding <=> abstract_embedding.embedding))::float > ${similarityThreshold}
    ORDER BY similarity DESC
    LIMIT 5;
  `;

	return results;
}

import { state } from '@davstack/store';

export class TextClassifier {
	text = state('');
	results = state<ClassificationResult[] | null>(null);
	error = state<string | null>(null);
	isLoading = state(false);

	async classify() {
		this.isLoading.set(true);
		this.error.set(null);
		this.results.set(null);

		try {
			const classificationResults = await classifyAbstract(this.text.get());
			this.results.set(classificationResults);
		} catch (err) {
			this.error.set('An error occurred while classifying the text.');
			console.error(err);
		} finally {
			this.isLoading.set(false);
		}
	}
}

export const textClassifier = new TextClassifier();
