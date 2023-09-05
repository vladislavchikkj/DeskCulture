import Bag from '@/app/cart/bag/Bag'
import { NO_INDEX_PAGE } from '@/constants/app.constants'
import Footer from '@/ui/layout/footer/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Cart',
	...NO_INDEX_PAGE
}

export default function CartPage() {
	return (
		<>
			<Bag />
			<Footer />
		</>
	)
}
