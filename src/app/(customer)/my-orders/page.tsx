import MyOrders from '@/../pages/account/my-orders'
import { useLayout } from '@/components/context/LayoutContext'
import { NO_INDEX_PAGE } from '@/constants/app.constants'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'My orders',
	...NO_INDEX_PAGE
}

export default function MyOrdersPage() {
	const { updateLayout } = useLayout()
	updateLayout(false)
	return <MyOrders />
}
