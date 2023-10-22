import '@/assets/styles/globals.scss'
import { getSiteUrl } from '@/config/url.config'
import { SITE_NAME } from '@/constants/app.constants'
import { ICON_PATH } from '@/constants/favicon.constant'
import Providers from '@/providers/Providers'
import { Metadata } from 'next'



export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body>
				<Providers>{children}</Providers>
				<div id='PopUp'></div>
				<div id='modal'></div>
				<div id='notifications'></div>
				<div id='lowbar'></div>
			</body>
		</html>
	)
}
