import { getSiteUrl } from '@/config/url.config'
import { SITE_NAME } from '@/constants/app.constants'
import { ICON_PATH } from '@/constants/favicon.constant'
import { ProductService } from '@/services/product/product.service'
import ProductList from '@/ui/catalog/productsList/ProductList'
import { Metadata } from 'next'

export const metadata: Metadata = {
	icons: {
		icon: ICON_PATH
	},
	title: {
		absolute: `Products | Catalog`,
		template: `%s | Catalog`
	},
	metadataBase: new URL(getSiteUrl()),
	openGraph: {
		type: 'website',
		siteName: SITE_NAME,
		emails: ['desk.culture.official@gmail.com']
	}
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
		<>
			<ProductList initialProducts={data.props.products} />
		</>
	)
}
