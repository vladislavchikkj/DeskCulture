// 'use client' // indicates Client Component

import '@/assets/styles/globals.scss'
import { getSiteUrl } from '@/config/url.config'
import { INTRO_IMG_PATH } from '@/constants/favicon.constant'
import Providers from '@/providers/Providers'
import { Inter } from '@next/font/google'
import { Metadata } from 'next'

const inter = Inter({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
	icons: {
		icon: './favicon.ico',
		shortcut: './favicon.ico',
		apple: './favicon.ico',
		other: {
			rel: './favicon.ico',
			url: './favicon.ico'
		}
	},
	title: {
		absolute: `Create Your Workspace | Desk Culture`,
		template: `%s | DeskCulture`
	},
	description: `Create a workspace that epitomizes your refined preferences while
	igniting your drive for productivity.`,
	metadataBase: new URL(getSiteUrl()),
	openGraph: {
		type: 'website',
		siteName: 'DeskCulture',
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
		title: `DeskCulture`,
		description:
			'Create a workspace that epitomizes your refined preferences while igniting your drive for productivity.',
		creator: 'jsCreator',
		images: INTRO_IMG_PATH,
		app: {
			name: 'DeskCulture',
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
			<meta name='yandex-verification' content='377fe05409c5b5dd' />
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
