import { getSiteUrl } from '@/config/url.config'
import { SITE_NAME } from '@/constants/app.constants'
import { ICON_PATH } from '@/constants/favicon.constant'
import { SetupsService } from '@/services/setups.service'
import SetupList from '@/ui/catalog/setupsList/SetupsList'
import { Metadata } from 'next'

export const metadata: Metadata = {
	icons: {
		icon: ICON_PATH
	},
	title: {
		absolute: `Setups | Catalog`,
		template: `%s | Catalog`
	},
	metadataBase: new URL(getSiteUrl()),
	openGraph: {
		type: 'website',
		siteName: SITE_NAME,
		emails: ['desk.culture.official@gmail.com']
	}
}

async function getStaticProps() {
	const setups = await SetupsService.getAll()

	const data = {
		setups: setups
	}

	return {
		props: data
	}
}

export default async function AllCategoryPage() {
	const data = await getStaticProps()

	return (
		<>
			<SetupList setups={data.props.setups} />
		</>
	)
}
