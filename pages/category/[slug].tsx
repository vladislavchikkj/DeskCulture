import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Meta from '@/ui/Meta'
import Layout from '@/ui/layout/Layout'
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
	return (
		<Meta title={category.name}>
			<Layout inView={false}>
				<Category products={products} category={category} />
			</Layout>
			<Footer />
		</Meta>
	)
}

export default CategoryPage