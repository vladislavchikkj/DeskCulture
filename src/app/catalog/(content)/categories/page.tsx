import { NO_INDEX_PAGE } from '@/constants/app.constants'
import { CategoryService } from '@/services/category.service'
import CategoryList from '@/ui/catalog/categoryList/CategoryList'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Categories',
	...NO_INDEX_PAGE
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
