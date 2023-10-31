/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	sassOptions: {
		fiber: false
	},
	env: {
		SERVER_URL: process.env.SERVER_URL,
		APP_URL: process.env.APP_URL
	},
	images: {
		domains: [
			'loremflickr.com',
			'www.aptronixindia.com',
			'picsum.photos',
			'i.pinimg.com',
			'i.ytimg.com',
			'blog-imgs-110.fc2.com',
			'localhost',
			's.alicdn.com',
			'deskculture-server.onrender.com',
			'ae01.alicdn.com',
			'pbs.twimg.com',
			'd3iy0wirzdn0f1.cloudfront.net',
			'9to5mac.com',
			'cdn.homedit.com',
			'sc04.alicdn.com',
			'desk-culture.com'
		],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'desk-culture.com'
			}
		]
	},
	webpack(config) {
		const fileLoaderRule = config.module.rules.find(rule =>
			rule.test?.test?.('.svg')
		)
		config.module.rules.push({
			test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]',
				outputPath: 'static/media/',
				publicPath: '_next/static/media/'
			}
		})
		config.module.rules.push(
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/ // *.svg?url
			},
			{
				test: /\.svg$/i,
				issuer: /\.[jt]sx?$/,
				resourceQuery: { not: /url/ }, // exclude if *.svg?url
				use: ['@svgr/webpack']
			}
		)
		fileLoaderRule.exclude = /\.svg$/i
		return config
	},
	async redirects() {
		return [
			{
				source: '/account',
				destination: '/account/my-orders',
				permanent: false // Используйте true для постоянного и false для временного перенаправления
			},
			{
				source: '/catalog',
				destination: '/catalog/categories',
				permanent: false // Используйте true для постоянного и false для временного перенаправления
			},
			{
				source: '/account/admin-panel/catalog-settings',
				destination: '/account/admin-panel/catalog-settings/products',
				permanent: false // Используйте true для постоянного и false для временного перенаправления
			}
			// Ваши другие перенаправления (если есть)
		]
	}
}

module.exports = nextConfig
