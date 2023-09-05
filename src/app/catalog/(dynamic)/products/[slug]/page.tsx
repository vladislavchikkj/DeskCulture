import Product from '@/screens/product/Product'
import { ProductService } from '@/services/product/product.service'
import { IPageSlugParam, TypeParamSlug } from '@/types/page-params'
import Footer from '@/ui/layout/footer/Footer'
import { Metadata } from 'next'

export const revalidate = 60

export async function generateStaticParams() {
	const productsData = await ProductService.getAll()
	const products = productsData.products || []
	const paths = products.map((product: { slug: string }) => ({
		params: { slug: product.slug }
	}))
	return paths
}

async function getProducts(params: TypeParamSlug) {
	const { data: products } = await ProductService.getBySlug(
		params?.slug as string
	)

	return { products }
}

export async function generateMetadata({
	params
}: IPageSlugParam): Promise<Metadata> {
	const { products } = await getProducts(params)

	return {
		title: products[0].name,

		description: `Random description about ${products[0].name}`,
		openGraph: {
			images: products[0].images,
			description: `Random description about ${products[0].name}`
		}
	}
}

export default async function ProductsPage({ params }: IPageSlugParam) {
	// const { updateLayout } = useLayout()
	// updateLayout(false)

	const data = await getProducts(params)
	return (
		<>
			<Product product={data.products} />
			<Footer />
		</>
	)
}
