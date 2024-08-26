let embeddingModel: any;

export async function generateEmbedding(text: string): Promise<number[]> {
	if (!embeddingModel) {
		const { pipeline } = await import('@xenova/transformers');
		embeddingModel = await pipeline(
			'feature-extraction',
			'Xenova/all-MiniLM-L6-v2'
		);
	}
	const result = await embeddingModel(text, {
		pooling: 'mean',
		normalize: true,
	});
	return Array.from(result.data);
}
