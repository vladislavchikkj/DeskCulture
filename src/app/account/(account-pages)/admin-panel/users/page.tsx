import type { Metadata } from 'next'
import Account from '../../Account'
import Users from './Users'

export const metadata: Metadata = {
	title: 'Users info'
}

export default async function UsersPage() {
	return (
		<>
			<Account>
				<Users />
			</Account>
		</>
	)
}
