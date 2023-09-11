import { useLayout } from '@/components/context/LayoutContext'
import { NO_INDEX_PAGE } from '@/constants/app.constants'
import Footer from '@/ui/layout/footer/Footer'
import { Metadata } from 'next'
import Auth from './Auth'

export const metadata: Metadata = {
	title: 'Auth',
	...NO_INDEX_PAGE
}

export default function AuthPage() {
	return (
		<div>
			<Auth />
			<Footer />
		</div>
	)
}
