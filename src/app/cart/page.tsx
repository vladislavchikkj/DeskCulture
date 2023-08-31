import { useLayout } from '@/components/context/LayoutContext'
import { NO_INDEX_PAGE } from '@/constants/app.constants'
import Bag from '@/screens/bag/Bag'
import Footer from '@/ui/layout/footer/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Cart',
	...NO_INDEX_PAGE
}

export default function CartPage() {
	const { updateLayout } = useLayout()
	updateLayout(false)
	return (
		<>
			<Bag />
			<Footer />
		</>
	)
}
