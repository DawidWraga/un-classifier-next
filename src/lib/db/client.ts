import { generateEmbedding } from '@/lib/generate-embedding';
import { seedDataSql } from '@/lib/db/seed-data';
import { PGlite } from '@electric-sql/pglite';
import { vector } from '@electric-sql/pglite/vector';

// Types
export interface Keyword {
	id: number;
	keyword: string;
}

type Embeddings = Record<string, number[]>;

// Database initialization
let dbReady = false;
export let db: PGlite;

async function createTables() {
	await db.exec(`
        CREATE TABLE IF NOT EXISTS items (
            id bigserial PRIMARY KEY,
            content TEXT NOT NULL UNIQUE,
            embedding vector(384)
        );

        CREATE TABLE IF NOT EXISTS goals (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT
        );

        CREATE TABLE IF NOT EXISTS targets (
            id SERIAL PRIMARY KEY,
            goal_id INTEGER REFERENCES goals(id),
            name TEXT NOT NULL,
            description TEXT
        );

        CREATE TABLE IF NOT EXISTS keywords (
            id SERIAL PRIMARY KEY,
            target_id INTEGER REFERENCES targets(id),
            keyword TEXT NOT NULL
        );

        ${seedDataSql}
    `);
}

async function getEmbeddings(): Promise<Embeddings> {
	async function getStoredEmbeddings(): Promise<Embeddings | null> {
		const storedEmbeddings = localStorage.getItem('embeddings');
		return storedEmbeddings ? JSON.parse(storedEmbeddings) : null;
	}

	async function generateNewEmbeddings(): Promise<Embeddings> {
		console.log('Generating new embeddings');
		const { rows: keywords } = await db.sql<Keyword>`
            SELECT id, keyword FROM keywords
        `;

		const newEmbeddings: Embeddings = {};
		for (const { keyword } of keywords) {
			newEmbeddings[keyword] = await generateEmbedding(keyword);
		}

		localStorage.setItem('embeddings', JSON.stringify(newEmbeddings));
		return newEmbeddings;
	}

	const storedEmbeddings = await getStoredEmbeddings();
	if (storedEmbeddings) {
		console.log('Loading embeddings from local storage');
		return storedEmbeddings;
	}
	return generateNewEmbeddings();
}

async function insertEmbeddings(embeddings: Embeddings): Promise<void> {
	for (const [keyword, embedding] of Object.entries(embeddings)) {
		const embeddingString = `[${embedding.join(',')}]`;
		await db.sql`
            INSERT INTO items (content, embedding)
            VALUES (${keyword}, ${embeddingString}::vector)
            ON CONFLICT (content) DO UPDATE SET embedding = ${embeddingString}::vector;
        `;
	}
	console.log('Embeddings inserted into database');
}

// Setup function
export async function setup(): Promise<void> {
	if (dbReady) return;

	try {
		// Initialize database
		db = new PGlite({ extensions: { vector } });
		await db.exec(`CREATE EXTENSION IF NOT EXISTS vector;`);
		console.log('Vector extension created successfully');
		await createTables();
		console.log('Database initialized successfully');

		// Process embeddings
		const embeddings = await getEmbeddings();
		await insertEmbeddings(embeddings);
		console.log('Embeddings processing complete');

		dbReady = true;
		console.log('Database setup complete');
	} catch (error) {
		console.error('Error during setup:', error);
		dbReady = false;
	}
}
