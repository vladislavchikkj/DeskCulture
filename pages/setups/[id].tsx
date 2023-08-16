import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Meta from '@/ui/Meta'
import Layout from '@/ui/layout/Layout'
import Footer from '@/ui/layout/footer/Footer'

import { IProduct } from '@/types/product.interface'
import { ISetups } from '@/types/setups.interface'

import Setup from '@/screens/setup/Setup'
import { ProductService } from '@/services/product/product.service'
import { SetupsService } from '@/services/setups.service'

export const getStaticPaths: GetStaticPaths = async () => {
	const setups = await SetupsService.getAll()

	const paths = setups.map(setup => {
		return {
			params: { id: setup.id.toString() }
		}
	})
	return { paths, fallback: 'blocking' }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { data: products } = await ProductService.getBySetupsId(
		String(params?.id)
	)
	const { data: setups } = await SetupsService.getById(String(params?.id))
	return {
		props: {
			products,
			setups
		}
	}
}
const SetupsPage: NextPage<{
	products: IProduct[]
	setups: ISetups
}> = ({ products, setups }) => {
	console.log(products)
	return (
		<Meta title={setups.name}>
			<Layout inView={false}>
				<Setup products={products} setups={setups} />
			</Layout>
			<Footer />
		</Meta>
	)
}

export default SetupsPage
