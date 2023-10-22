import Product from '@/app/catalog/(dynamic)/products/product/Product'
import { ProductService } from '@/services/product/product.service'
import { IPageSlugParam, TypeParamSlug } from '@/types/page-params'
import Footer from '@/ui/layout/footer/Footer'
import { Metadata } from 'next'

export const revalidate = 60

async function getProducts(params: TypeParamSlug) {
	const { data: products } = await ProductService.getBySlug(
		params?.slug as string
	)

	return { products }
}

export async function generateMetadata({
	params
}: IPageSlugParam): Promise<Metadata> {
	const data = await getProducts(params)

	return {
		title: data.products[0].name,

		description: `Random description about`,
		openGraph: {
			images: data.products[0].images,
			description: `Random description about`
		}
	}
}

export default async function ProductsPage({ params }: IPageSlugParam) {
	const data = await getProducts(params)
	return (
		<>
			<Product product={data.products} />
			<Footer />
		</>
	)
}
