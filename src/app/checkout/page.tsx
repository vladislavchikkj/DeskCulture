import { NO_INDEX_PAGE } from '@/constants/app.constants'
import type { Metadata } from 'next'
import Checkout from './Checkout'

export const metadata: Metadata = {
	title: 'Checkout',
	...NO_INDEX_PAGE
}

export default async function CheckoutPage() {
	return (
		<>
			<Checkout />
		</>
	)
}
