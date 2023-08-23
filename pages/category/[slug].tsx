import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { useLayout } from '@/components/context/LayoutContext'

import Meta from '@/ui/Meta'
import Footer from '@/ui/layout/footer/Footer'

import { ICategory } from '@/types/category.interface'
import { IProduct } from '@/types/product.interface'

import Category from '@/screens/category/Category'
import { CategoryService } from '@/services/category.service'
import { ProductService } from '@/services/product/product.service'

export const getStaticPaths: GetStaticPaths = async () => {
	const categories = await CategoryService.getAll()

	const paths = categories.map(category => {
		return {
			params: { slug: category.slug }
		}
	})
	return { paths, fallback: 'blocking' }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { data: products } = await ProductService.getByCategory(
		params?.slug as string
	)
	const { data: category } = await CategoryService.getBySlug(
		params?.slug as string
	)
	return {
		props: {
			products,
			category
		}
	}
}
const CategoryPage: NextPage<{
	products: IProduct[]
	category: ICategory
}> = ({ products, category }) => {
	const { layout, updateLayout } = useLayout()
	updateLayout(false)
	return (
		<Meta title={category.name}>
			<Category products={products} category={category} />
			<Footer />
		</Meta>
	)
}

export default CategoryPage
