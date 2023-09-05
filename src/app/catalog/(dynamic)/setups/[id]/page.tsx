import { useLayout } from '@/components/context/LayoutContext'
import Setup from '@/app/catalog/(dynamic)/setups/setup/Setup'
import { SetupsService } from '@/services/setups.service'
import { IPageIdParam, TypeParamId } from '@/types/page-params'
import Footer from '@/ui/layout/footer/Footer'
import { Metadata } from 'next'

export const revalidate = 60

export async function generateStaticPaths() {
	const setups = await SetupsService.getAll()

	const paths = setups.map((setup: { id: { toString: () => any } }) => {
		return {
			params: { id: setup.id.toString() }
		}
	})
	return paths
}

export const getAllSetups = async (excludeId: number) => {
	const allSetups = await SetupsService.getAll()
	return allSetups
		.filter((setup: { id: number }) => setup.id !== excludeId)
		.sort(() => Math.random() - 0.5)
		.slice(0, 2)
}

async function getProducts(params: TypeParamId) {
	const { data: products } = await SetupsService.getBySetups(String(params?.id))
	const { data: setups } = await SetupsService.getById(String(params?.id))
	const allSetups = await getAllSetups(setups.id)
	return { products, setups, allSetups }
}

export async function generateMetadata({
	params
}: IPageIdParam): Promise<Metadata> {
	const { setups, products } = await getProducts(params)

	return {
		title: setups.name,

		description: `Random description about ${setups.name}`,
		openGraph: {
			images: products[0].images,
			description: `Random description about ${setups.name}`
		}
	}
}

export default async function SetupsPage({ params }: IPageIdParam) {
	// const { updateLayout } = useLayout()
	// updateLayout(false)

	const data = await getProducts(params)
	return (
		<>
			<Setup
				products={data.products}
				setups={data.setups}
				allSetups={data.allSetups}
			/>
			<Footer />
		</>
	)
}
