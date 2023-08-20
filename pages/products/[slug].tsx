import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Meta from '@/ui/Meta'
import Footer from '@/ui/layout/footer/Footer'

import { IProduct } from '@/types/product.interface'

import Product from '@/screens/product/Product'
// Укажите путь в соответствии с вашей структурой файлов
import { ProductService } from '@/services/product/product.service'

export const getStaticPaths: GetStaticPaths = async () => {
	const productsData = await ProductService.getAll({
		page: 1,
		perPage: 6
	})
	const products = productsData.products || []
	const paths = products.map((product: { slug: string }) => ({
		params: { slug: product.slug }
	}))

	return { paths, fallback: true }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const slug = params?.slug as string

	if (!slug) {
		return { notFound: true }
	}

	const { data: products } = await ProductService.getBySlug(
		params?.slug as string
	)

	if (!products) {
		return { notFound: true }
	}

	const product = products

	return { props: { product }, revalidate: 60 }
}

const ProductPage: NextPage<{
	product: IProduct[]
}> = ({ product }) => {
	const [productArr] = product
	return (
		<Meta title={productArr.name}>
			<Product product={product} />
			<Footer />
		</Meta>
	)
}

export default ProductPage
