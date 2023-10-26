import { getSiteUrl } from '@/config/url.config'
import { SITE_NAME } from '@/constants/app.constants'
import { ICON_PATH } from '@/constants/favicon.constant'
import type { Metadata } from 'next'
import Checkout from './Checkout'

export const metadata: Metadata = {
	icons: {
		icon: ICON_PATH
	},
	title: {
		absolute: `Shipping address | Checkout`,
		template: `%s | Checkout`
	},
	metadataBase: new URL(getSiteUrl()),
	openGraph: {
		type: 'website',
		siteName: SITE_NAME,
		emails: ['desk.culture.official@gmail.com']
	}
}

export default async function CheckoutPage() {
	return (
		<>
			<Checkout />
		</>
	)
}
