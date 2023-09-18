import { NO_INDEX_PAGE } from '@/constants/app.constants'
import { Metadata } from 'next'
import Contacts from './Contacts'

export const metadata: Metadata = {
	title: 'Contacts',
	...NO_INDEX_PAGE
}

export default function ContactsPage() {
	return (
		<>
			<Contacts />
		</>
	)
}
