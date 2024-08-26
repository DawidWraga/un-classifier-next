'use client';

import React from 'react';
import { ClassificationResult, textClassifier } from '@/lib/classify-abstract';

export default function Home() {
	const error = textClassifier.error.use();
	const results = textClassifier.results.use();

	return (
		<div className="max-w-4xl mx-auto p-4 text-black">
			<h1 className="text-3xl font-bold mb-4">Text Classification</h1>
			<MainTextInput />
			{error && <p className="mt-4 text-red-600">{error}</p>}
			{results && (
				<div className="mt-8">
					<h2 className="text-2xl font-semibold mb-4">
						Classification Results
					</h2>
					{results.map((result, index) => (
						<ResultCard key={index} result={result} />
					))}
				</div>
			)}
		</div>
	);
}

function MainTextInput() {
	const isLoading = textClassifier.isLoading.use();
	const text = textClassifier.text.use();

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				await textClassifier.classify();
			}}
			className="space-y-4"
		>
			<textarea
				className="w-full h-32 p-2 border border-gray-300 rounded text-black"
				value={text}
				onChange={(e) => textClassifier.text.set(e.target.value)}
				placeholder="Paste your text here"
				required
			/>
			<button
				type="submit"
				disabled={isLoading}
				className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
			>
				{isLoading ? 'Classifying...' : 'Classify'}
			</button>
		</form>
	);
}

function ResultCard({ result }: { result: ClassificationResult }) {
	return (
		<div className="bg-gray-100 p-4 rounded mb-4">
			<p>
				<strong>Keyword:</strong> {result.keyword}
			</p>
			<p>
				<strong>Target:</strong> {result.target_name}
			</p>
			<p>
				<strong>Goal:</strong> {result.goal_name}
			</p>
			<p>
				<strong>Similarity:</strong> {(result.similarity * 100).toFixed(2)}%
			</p>
		</div>
	);
}
