import { getSiteUrl } from '@/config/url.config'
import { SITE_NAME } from '@/constants/app.constants'
import { ICON_PATH, INTRO_IMG_PATH } from '@/constants/favicon.constant'
import { CategoryService } from '@/services/category.service'
import { ProductService } from '@/services/product/product.service'
import { SetupsService } from '@/services/setups.service'
import type { Metadata } from 'next'
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
		absolute: `Create Your Workspace | ${SITE_NAME}`,
		template: `%s | ${SITE_NAME}`
	},
	description: `Create a workspace that epitomizes your refined preferences while
	igniting your drive for productivity.`,
	metadataBase: new URL(getSiteUrl()),
	openGraph: {
		type: 'website',
		siteName: SITE_NAME,
		emails: ['desk.culture.official@gmail.com'],
		images: INTRO_IMG_PATH
	},
	keywords: ['DeskCulture', 'deskculture', 'Create Your Workspace'],
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: false,
			noimageindex: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1
		}
	},
	twitter: {
		card: 'app',
		title: `${SITE_NAME}`,
		description:
			'Create a workspace that epitomizes your refined preferences while igniting your drive for productivity.',
		creator: 'jsCreator',
		images: INTRO_IMG_PATH,
		app: {
			name: 'DeskCulture',
			id: {
				iphone: 'twitter_app://iphone',
				ipad: 'twitter_app://ipad',
				googleplay: 'twitter_app://googleplay'
			},
			url: {
				iphone: 'https://iphone_url',
				ipad: 'https://ipad_url'
			}
		}
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
