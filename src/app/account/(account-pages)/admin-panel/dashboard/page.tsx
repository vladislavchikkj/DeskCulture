import type { Metadata } from 'next'
import Account from '../../Account'
import Dashboard from './Dashboard'

export const metadata: Metadata = {
	title: 'Dashboard'
}

export default async function DashboardPage() {
	return (
		<>
			<Account>
				<Dashboard />
			</Account>
		</>
	)
}
