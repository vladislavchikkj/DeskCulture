import { getSiteUrl } from '@/config/url.config'
import { SITE_NAME } from '@/constants/app.constants'
import { ICON_PATH } from '@/constants/favicon.constant'
import { Metadata } from 'next'
import Contacts from './Contacts'

export const metadata: Metadata = {
	icons: {
		icon: ICON_PATH
	},
	title: {
		absolute: `Get In Touch | Contacts`,
		template: `%s | Contacts`
	},
	metadataBase: new URL(getSiteUrl()),
	openGraph: {
		type: 'website',
		siteName: SITE_NAME,
		emails: ['desk.culture.official@gmail.com']
	}
}

export default function ContactsPage() {
	return (
		<>
			<Contacts />
		</>
	)
}
