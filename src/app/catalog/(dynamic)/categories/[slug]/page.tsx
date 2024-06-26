import Category from '@/app/catalog/(dynamic)/categories/category/Category'
import { CategoryService } from '@/services/category.service'
import { ProductService } from '@/services/product/product.service'
import { IPageSlugParam, TypeParamSlug } from '@/types/page-params'
import Footer from '@/ui/layout/footer/Footer'
import { Metadata } from 'next'

async function getProducts(params: TypeParamSlug) {
	const { data: products } = await ProductService.getByCategory(
		params?.slug as string
	)
	const { data: category } = await CategoryService.getBySlug(
		params?.slug as string
	)
	return { products, category }
}

export async function generateMetadata({
	params
}: IPageSlugParam): Promise<Metadata> {
	const { category, products } = await getProducts(params)

	return {
		title: category.name,

		description: `Random description about ${category.name}`,
		openGraph: {
			images: products[0].images,
			description: `Random description about ${category.name}`
		}
	}
}

export default async function CategoryPage({ params }: IPageSlugParam) {
	const data = await getProducts(params)
	return (
		<>
			<Category products={data.products || []} category={data.category} />
			<Footer />
		</>
	)
}
