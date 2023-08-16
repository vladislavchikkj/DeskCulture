import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import Meta from '@/ui/Meta'
import Layout from '@/ui/layout/Layout'

import { IProduct } from '@/types/product.interface'

// Укажите путь в соответствии с вашей структурой файлов
import Product from '@/screens/product/Product'
import { ProductService } from '@/services/product/product.service'

export const getStaticPaths: GetStaticPaths = async () => {
	const productsData = await ProductService.getAll()
	const products = productsData.products || [] // Убедитесь, что массив продуктов существует
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

	const response = await ProductService.getBySlug(slug)

	if (!response) {
		return { notFound: true }
	}

	const product = {
		...response.data // Передайте только данные продукта, не включая headers
	}

	return { props: { product }, revalidate: 60 }
}

const ProductPage: NextPage<{
	product: IProduct
}> = ({ product }) => {
	const router = useRouter()

	// Обработка состояния загрузки
	if (router.isFallback) {
		return <div>Загрузка...</div>
	}

	return (
		<Meta title={product.name}>
			<Layout inView={false}>
				<Product product={product} />
			</Layout>
		</Meta>
	)
}

export default ProductPage
