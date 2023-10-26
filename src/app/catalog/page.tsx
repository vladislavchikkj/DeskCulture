import { getSiteUrl } from '@/config/url.config'
import { SITE_NAME } from '@/constants/app.constants'
import { ICON_PATH } from '@/constants/favicon.constant'
import Catalog from '@/ui/catalog/Catalog'
import { Metadata } from 'next'

export const metadata: Metadata = {
	icons: {
		icon: ICON_PATH
	},
	title: {
		absolute: `Create Your Workspace | Catalog`,
		template: `%s | Catalog`
	},
	metadataBase: new URL(getSiteUrl()),
	openGraph: {
		type: 'website',
		siteName: SITE_NAME,
		emails: ['desk.culture.official@gmail.com']
	}
}

export default async function CatalogPage() {
	return <Catalog title='Catalog'>Catalog</Catalog>
}
