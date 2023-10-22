import Home from '@/app/home/Home'
import { getSiteUrl } from '@/config/url.config'
import { SITE_NAME } from '@/constants/app.constants'
import { ICON_PATH } from '@/constants/favicon.constant'
import { CategoryService } from '@/services/category.service'
import { ProductService } from '@/services/product/product.service'
import { SetupsService } from '@/services/setups.service'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	icons: {
		icon: ICON_PATH
	},
	title: {
		absolute: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	metadataBase: new URL(getSiteUrl()),
	openGraph: {
		type: 'website',
		siteName: SITE_NAME,
		emails: ['desk.culture.official@gmail.com']
	}
}

export const revalidate = 60

async function getStaticProps() {
	const categories = await CategoryService.getAll()
	const setups = await SetupsService.getAll()
	const products = await ProductService.getAll({
		page: 2,
		perPage: 4
	})

	const data = {
		categories: categories,
		setups: setups,
		products: products
	}
	return {
		props: data
	}
}

export default async function HomePage() {
	const data = await getStaticProps()
	return (
		<>
			<Home
				categories={data.props.categories}
				categoriesLength={data.props.categories.length}
				setups={data.props.setups}
				setupsLength={data.props.setups.length}
				products={data.props.products.products}
			/>
		</>
	)
}
