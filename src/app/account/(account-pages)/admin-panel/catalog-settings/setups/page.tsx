import { SetupsService } from '@/services/setups.service'
import Account from '../../../Account'
import CatalogSettings from '../CatalogSettings'
import SetupsSettings from './Setups'

async function getStaticProps() {
	const setups = await SetupsService.getAll()

	const data = {
		setups: setups
	}
	return {
		props: data
	}
}

export default async function SetupsSettingsPage() {
	const data = await getStaticProps()
	return (
		<div>
			<Account>
				<h1 className='title'>Setups settings</h1>
				<CatalogSettings>
					<SetupsSettings setups={data.props.setups} />
				</CatalogSettings>
			</Account>
		</div>
	)
}
