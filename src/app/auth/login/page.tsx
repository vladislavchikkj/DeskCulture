import { getSiteUrl } from '@/config/url.config'
import { SITE_NAME } from '@/constants/app.constants'
import { ICON_PATH } from '@/constants/favicon.constant'
import Footer from '@/ui/layout/footer/Footer'
import { Metadata } from 'next'
import Login from './Login'

export const metadata: Metadata = {
	icons: {
		icon: ICON_PATH
	},
	title: {
		absolute: `Welcome to DeskCulture | Log In | Auth`
	},
	metadataBase: new URL(getSiteUrl()),
	openGraph: {
		type: 'website',
		siteName: SITE_NAME,
		emails: ['desk.culture.official@gmail.com']
	}
}

export default function LoginPage() {
	return (
		<div>
			<Login />
			<Footer />
		</div>
	)
}
