import { db } from './client';

export async function testVectorExtension() {
	try {
		const testVector1 = generateRandomVector(384);
		const testVector2 = generateRandomVector(384);
		const queryVector = generateRandomVector(384);

		await db.exec(`
      INSERT INTO items (content, embedding) 
      VALUES ('test1', '${JSON.stringify(testVector1)}'::vector), 
             ('test2', '${JSON.stringify(testVector2)}'::vector);

      SELECT * FROM items 
      WHERE content IN ('test1', 'test2') 
      ORDER BY embedding <-> '${JSON.stringify(queryVector)}'::vector 
      LIMIT 1;
    `);
		console.log('Vector operations tested successfully');
	} catch (error) {
		console.error('Error testing vector extension:', error);
	}
}

function generateRandomVector(dimensions: number): number[] {
	return Array.from({ length: dimensions }, () => Math.random());
}
