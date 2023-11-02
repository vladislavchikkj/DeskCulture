import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: 'https://desk-culture.com',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1
		},
		{
			url: 'https://desk-culture.com/contacts',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8
		},
		{
			url: 'https://desk-culture.com/catalog/categories',
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.5
		}
	]
}
