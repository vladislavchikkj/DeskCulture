import { NO_INDEX_PAGE } from '@/constants/app.constants'
import { CategoryService } from '@/services/category.service'
import Catalog from '@/ui/catalog/Catalog'
import CatalogMenu from '@/ui/catalog/catalogMenu/catalogMenu'
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
			<Catalog title='Catalog'>
				<CategoryList categories={data.props.categories} />
			</Catalog>
		</>
	)
}
