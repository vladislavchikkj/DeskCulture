import { ICON_PATH, INTRO_IMG_PATH } from '@/constants/favicon.constant'
import { CategoryService } from '@/services/category.service'
import { ProductService } from '@/services/product/product.service'
import { SetupsService } from '@/services/setups.service'
import { Metadata } from 'next'
import Home from './home/Home'

export const metadata: Metadata = {
	icons: {
		icon: ICON_PATH,
		shortcut: ICON_PATH,
		apple: ICON_PATH,
		other: {
			rel: ICON_PATH,
			url: ICON_PATH
		}
	},
	title: {
		absolute: `Create Your Workspace | Desk Culture`,
		template: `%s | Desk Culture`
	},
	description: `Create a workspace that epitomizes your refined preferences while
	igniting your drive for productivity.`,
	openGraph: {
		type: 'website',
		siteName: 'Desk Culture',
		emails: ['desk.culture.official@gmail.com'],
		images: INTRO_IMG_PATH
	},
	keywords: [
		'Desk',
		'Culture',
		'desk culture',
		'Desk Culture',
		'Desk-Culture',
		'desk',
		'culture',
		'desk-culture',
		'Create Your Workspace',
		'shop'
	]
}

async function getDataInfo() {
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
	const data = await getDataInfo()

	return (
		<Home
			categories={data.props.categories}
			categoriesLength={data.props.categories.length}
			setups={data.props.setups}
			setupsLength={data.props.setups.length}
			products={data.props.products.products}
		/>
	)
}
