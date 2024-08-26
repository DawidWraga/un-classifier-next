// /** @type {import('next').NextConfig} */
// let nextConfig = {
// 	images: {},
// 	transpilePackages: [
// 		'@electric-sql/pglite-react',
// 		'@electric-sql/pglite-repl',
// 		'@electric-sql/pglite',
// 		'@xenova/transformers',
// 	],
// 	experimental: {
// 		serverComponentsExternalPackages: [
// 			'@electric-sql/pglite',
// 			'@xenova/transformers',
// 		],
// 	},
// 	// webpack: (config, options) => {
// 	// 	config.module.rules.push({
// 	// 		test: /\.+(js|jsx|mjs|ts|tsx)$/,
// 	// 		use: options.defaultLoaders.babel,
// 	// 		include: fileURLToPath(import.meta.resolve('@electric-sql/pglite')),
// 	// 		type: 'javascript/auto',
// 	// 	});

// 	// 	if (!options.isServer) {
// 	// 		config.resolve.fallback = { fs: false, module: false, path: false };
// 	// 	}

// 	// 	return config;
// 	// },
// 	// (Optional) Export as a static site
// 	// See https://nextjs.org/docs/pages/building-your-application/deploying/static-exports#configuration
// 	output: 'export', // Feel free to modify/remove this option

// 	// Override the default webpack configuration
// 	webpack: (config) => {
// 		// See https://webpack.js.org/configuration/resolve/#resolvealias
// 		config.resolve.alias = {
// 			...config.resolve.alias,
// 			sharp$: false,
// 			'onnxruntime-node$': false,
// 		};
// 		return config;
// 	},
// 	transpilePackages: [],
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: false,
	// webpack: (config) => {
	// 	config.resolve.alias = {
	// 		...config.resolve.alias,
	// 		sharp$: false,
	// 		'onnxruntime-node$': false,
	// 	};

	// 	return config;
	// },
	// webpack: (config, options) => {
	// 	config.module.rules.push({
	// 		test: /\.+(js|jsx|mjs|ts|tsx)$/,
	// 		use: options.defaultLoaders.babel,
	// 		include: fileURLToPath(import.meta.resolve('@electric-sql/pglite')),
	// 		type: 'javascript/auto',
	// 	});

	// 	if (!options.isServer) {
	// 		config.resolve.fallback = { fs: false, module: false, path: false };
	// 	}

	// 	return config;
	// },
	transpilePackages: [
		// '@electric-sql/pglite-react',
		// '@electric-sql/pglite-repl',
		'@electric-sql/pglite',
	],
	experimental: {
		serverComponentsExternalPackages: [
			// '@electric-sql/pglite',
			'@xenova/transformers',
			'sharp',
			'onnxruntime-node',
		],
	},
};

export default nextConfig;
