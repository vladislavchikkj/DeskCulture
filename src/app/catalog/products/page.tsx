import { NO_INDEX_PAGE } from '@/constants/app.constants'
import { ProductService } from '@/services/product/product.service'
import Catalog from '@/ui/catalog/Catalog'
import ProductList from '@/ui/catalog/productsList/ProductList'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Products',
	...NO_INDEX_PAGE
}

async function getStaticProps() {
	const products = await ProductService.getAll({
		page: 1,
		perPage: 6
	})

	const data = {
		products: products.products
	}

	return {
		props: data
	}
}

export default async function AllProductPage() {
	const data = await getStaticProps()

	return (
		<Catalog title='Catalog'>
			<ProductList initialProducts={data.props.products} />
		</Catalog>
	)
}
