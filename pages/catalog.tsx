import { GetStaticProps, NextPage } from 'next'

import { useLayout } from '@/components/context/LayoutContext'

import { TypePaginationСatalog } from '@/types/product.interface'

import CatalogPage from '@/screens/catalog/CatalogPage'
import { CategoryService } from '@/services/category.service'
import { ProductService } from '@/services/product/product.service'
import { SetupsService } from '@/services/setups.service'

const Catalog: NextPage<TypePaginationСatalog> = ({
	products,
	categories,
	setups
}) => {
	const { updateLayout } = useLayout()
	updateLayout(false)
	return (
		<CatalogPage products={products} categories={categories} setups={setups} />
	)
}

export const getStaticProps: GetStaticProps<
	TypePaginationСatalog
> = async () => {
	const products = await ProductService.getAll({
		page: 1,
		perPage: 6
	})
	const categories = await CategoryService.getAll()
	const setups = await SetupsService.getAll()

	const obj = {
		products: products.products, // Assuming ProductService.getAll returns { products: TypePaginationProducts[] }
		categories: categories,
		setups: setups
	}

	return {
		props: obj
	}
}

export default Catalog
