import { useLayout } from '@/components/context/LayoutContext'
import { NO_INDEX_PAGE } from '@/constants/app.constants'
import { CategoryService } from '@/services/category.service'
import { ProductService } from '@/services/product/product.service'
import { SetupsService } from '@/services/setups.service'
import Catalog from '@/ui/catalog/Catalog'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Catalog',
	...NO_INDEX_PAGE
}

async function getStaticProps() {
	const products = await ProductService.getAll({
		page: 1,
		perPage: 6
	})
	const categories = await CategoryService.getAll()
	const setups = await SetupsService.getAll()

	const data = {
		products: products.products,
		categories: categories,
		setups: setups
	}

	return {
		props: data
	}
}

export default async function CatalogPage() {
	const data = await getStaticProps()

	return (
		<Catalog
			data={{
				products: data.props.products,
				categories: data.props.categories,
				setups: data.props.setups
			}}
		/>
	)
}
