import { useLayout } from '@/components/context/LayoutContext'
import { NO_INDEX_PAGE } from '@/constants/app.constants'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Thanks',
	...NO_INDEX_PAGE
}

export default function ThanksPage() {
	const { updateLayout } = useLayout()
	updateLayout(false)
	return <div>Thanks</div>
}
