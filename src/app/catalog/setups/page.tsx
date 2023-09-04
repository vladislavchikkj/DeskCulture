import { NO_INDEX_PAGE } from '@/constants/app.constants'
import { SetupsService } from '@/services/setups.service'
import Catalog from '@/ui/catalog/Catalog'
import CatalogMenu from '@/ui/catalog/catalogMenu/catalogMenu'
import SetupList from '@/ui/catalog/setupsList/SetupsList'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Setups',
	...NO_INDEX_PAGE
}

async function getStaticProps() {
	const setups = await SetupsService.getAll()

	const data = {
		setups: setups
	}

	return {
		props: data
	}
}

export default async function AllCategoryPage() {
	const data = await getStaticProps()

	return (
		<>
			<Catalog title='Catalog'>
				<SetupList setups={data.props.setups} />
			</Catalog>
		</>
	)
}
