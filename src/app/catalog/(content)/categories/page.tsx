import { getSiteUrl } from '@/config/url.config'
import { SITE_NAME } from '@/constants/app.constants'
import { ICON_PATH } from '@/constants/favicon.constant'
import { CategoryService } from '@/services/category.service'
import CategoryList from '@/ui/catalog/categoryList/CategoryList'
import { Metadata } from 'next'

export const metadata: Metadata = {
	icons: {
		icon: ICON_PATH
	},
	title: {
		absolute: `Categories | Catalog`,
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
	const categories = await CategoryService.getAll()

	const data = {
		categories: categories
	}

	return {
		props: data
	}
}

export default async function AllCategoryPage() {
	const data = await getStaticProps()

	return (
		<>
			<CategoryList categories={data.props.categories} />
		</>
	)
}
