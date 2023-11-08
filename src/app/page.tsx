import { getSiteUrl } from '@/config/url.config'
import { INTRO_IMG_PATH } from '@/constants/favicon.constant'
import { CategoryService } from '@/services/category.service'
import { ProductService } from '@/services/product/product.service'
import { SetupsService } from '@/services/setups.service'
import type { Metadata } from 'next'
import Home from './home/Home'

// export const metadata: Metadata = {
// 	icons: {
// 		icon: './favicon.ico',
// 		shortcut: './favicon.ico',
// 		apple: './favicon.ico',
// 		other: {
// 			rel: './favicon.ico',
// 			url: './favicon.ico'
// 		}
// 	},
// 	title: {
// 		absolute: `Create Your Workspace | DeskCulture`,
// 		template: `%s | DeskCulture`
// 	},
// 	description: `Create a workspace that epitomizes your refined preferences while
// 	igniting your drive for productivity.`,
// 	metadataBase: new URL(getSiteUrl()),
// 	openGraph: {
// 		type: 'website',
// 		siteName: 'DeskCulture',
// 		emails: ['desk.culture.official@gmail.com'],
// 		images: INTRO_IMG_PATH
// 	},
// 	keywords: [
// 		'desk',
// 		'culture',
// 		'desk culture',
// 		'Desk-Culture',
// 		'desk-culture',
// 		'Create Your Workspace'
// 	],
// 	twitter: {
// 		card: 'app',
// 		title: `DeskCulture`,
// 		description:
// 			'Create a workspace that epitomizes your refined preferences while igniting your drive for productivity.',
// 		creator: 'jsCreator',
// 		images: INTRO_IMG_PATH,
// 		app: {
// 			name: 'DeskCulture',
// 			id: {
// 				iphone: 'twitter_app://iphone',
// 				ipad: 'twitter_app://ipad',
// 				googleplay: 'twitter_app://googleplay'
// 			},
// 			url: {
// 				iphone: 'https://iphone_url',
// 				ipad: 'https://ipad_url'
// 			}
// 		}
// 	}
// }

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
