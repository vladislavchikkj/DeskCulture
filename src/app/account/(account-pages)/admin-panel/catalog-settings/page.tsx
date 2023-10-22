import type { Metadata } from 'next'
import Account from '../../Account'
import CatalogSettings from './CatalogSettings'

export const metadata: Metadata = {
	title: 'Catalog settings'
}

export default async function CatalogSettingsPage() {
	return (
		<>
			<Account>
				<CatalogSettings />
			</Account>
		</>
	)
}
