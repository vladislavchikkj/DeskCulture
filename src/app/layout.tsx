// 'use client' // indicates Client Component

import '@/assets/styles/globals.scss'
import { getSiteUrl } from '@/config/url.config'
import { SITE_NAME } from '@/constants/app.constants'
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
		absolute: `Create Your Workspace | ${SITE_NAME}`,
		template: `%s | ${SITE_NAME}`
	},
	description: `Create a workspace that epitomizes your refined preferences while
	igniting your drive for productivity.`,
	metadataBase: new URL(getSiteUrl()),
	openGraph: {
		type: 'website',
		siteName: SITE_NAME,
		emails: ['desk.culture.official@gmail.com'],
		images: INTRO_IMG_PATH
	},
	keywords: ['DeskCulture', 'deskculture', 'Create Your Workspace'],
	robots: {
		index: true,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: false,
			noimageindex: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1
		}
	},
	twitter: {
		card: 'app',
		title: `${SITE_NAME}`,
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
