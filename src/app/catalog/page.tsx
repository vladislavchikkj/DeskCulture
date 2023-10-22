import { NO_INDEX_PAGE } from '@/constants/app.constants'
import Catalog from '@/ui/catalog/Catalog'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Catalog',
	...NO_INDEX_PAGE
}

export default async function CatalogPage() {
	return <Catalog title='Catalog'>Catalog</Catalog>
}
