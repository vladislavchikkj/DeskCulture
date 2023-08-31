import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { useLayout } from '@/components/context/LayoutContext'

import Footer from '@/ui/layout/footer/Footer'

import { IProduct } from '@/types/product.interface'
import { ISetups } from '@/types/setups.interface'

import Setup from '@/screens/setup/Setup'
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
export const getAllSetups = async (excludeId: number) => {
	const allSetups = await SetupsService.getAll()
	return allSetups
		.filter(setup => setup.id !== excludeId)
		.sort(() => Math.random() - 0.5)
		.slice(0, 2)
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { data: products } = await SetupsService.getBySetups(String(params?.id))
	const { data: setups } = await SetupsService.getById(String(params?.id))
	const allSetups = await getAllSetups(setups.id) // Исключаем текущий setup
	return {
		props: {
			products,
			setups,
			allSetups // Передаем список всех сетапов без текущего в props
		}
	}
}

const SetupsPage: NextPage<{
	products: IProduct[]
	setups: ISetups
	allSetups: ISetups[]
}> = ({ products, setups, allSetups }) => {
	const { layout, updateLayout } = useLayout()
	updateLayout(false)
	return (
		<>
			<Setup products={products} setups={setups} allSetups={allSetups} />
			<Footer />
		</>
	)
}

export default SetupsPage
