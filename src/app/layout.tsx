// 'use client' // indicates Client Component

import '@/assets/styles/globals.scss'
import { getSiteUrl } from '@/config/url.config'
import { ICON_PATH, INTRO_IMG_PATH } from '@/constants/favicon.constant'
import Providers from '@/providers/Providers'
import { Inter } from '@next/font/google'
import { Metadata } from 'next'

const inter = Inter({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
	icons: {
		icon: ICON_PATH,
		shortcut: ICON_PATH,
		apple: ICON_PATH,
		other: {
			rel: ICON_PATH,
			url: ICON_PATH
		}
	},
	title: {
		absolute: `Create Your Workspace | Desk Culture`,
		template: `%s | Desk Culture`
	},
	description: `Create a workspace that epitomizes your refined preferences while
	igniting your drive for productivity.`,
	metadataBase: new URL(getSiteUrl()),
	openGraph: {
		type: 'website',
		siteName: 'Desk Culture',
		emails: ['desk.culture.official@gmail.com'],
		images: INTRO_IMG_PATH
	},
	keywords: [
		'Desk',
		'Culture',
		'desk culture',
		'Desk Culture',
		'Desk-Culture',
		'desk',
		'culture',
		'desk-culture',
		'Create Your Workspace',
		'shop'
	],
	twitter: {
		card: 'app',
		title: `Desk Culture`,
		description:
			'Create a workspace that epitomizes your refined preferences while igniting your drive for productivity.',
		creator: 'jsCreator',
		images: ICON_PATH,
		app: {
			name: 'Desk Culture',
			id: {
				iphone: 'twitter_app://iphone',
				ipad: 'twitter_app://ipad',
				googleplay: 'twitter_app://googleplay'
			},
			url: {
				iphone: 'https://iphone_url',
				ipad: 'https://ipad_url'
			}
		}
	}
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
			<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			<meta name='yandex-verification' content='377fe05409c5b5dd' />
			<meta name='p:domain_verify' content='a169cc8e4f65189c7a0f1f2bb9153724' />
			<meta
				name='google-site-verification'
				content='+nxGUDJ4QpAZ5l9Bsjdi102tLVC21AIh5d1Nl23908vVuFHs34='
			/>
			<link rel='icon' href='/favicon.ico' sizes='any' />
			<meta property='og:image' content='/public/intro.png' />

			<body className={inter.className}>
				<Providers>{children}</Providers>
				<div id='PopUp'></div>
				<div id='modal'></div>
				<div id='notifications'></div>
				<div id='lowbar'></div>
			</body>
		</html>
	)
}
