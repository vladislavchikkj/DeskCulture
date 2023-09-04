/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
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
			'blog-imgs-110.fc2.com'
		]
	},
	webpack(config) {
		const fileLoaderRule = config.module.rules.find(rule =>
			rule.test?.test?.('.svg')
		)
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
			}
			// Ваши другие перенаправления (если есть)
		]
	}
}

module.exports = nextConfig
