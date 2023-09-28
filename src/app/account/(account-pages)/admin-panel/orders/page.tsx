import type { Metadata } from 'next'
import Account from '../../Account'
import OrdersInfo from './OrdersInfo'

export const metadata: Metadata = {
	title: 'Orders info'
}

export default async function OrdersPage() {
	return (
		<>
			<Account>
				<OrdersInfo />
			</Account>
		</>
	)
}
