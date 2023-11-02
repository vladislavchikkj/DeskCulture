'use client' // indicates Client Component

import '@/assets/styles/globals.scss'
import Providers from '@/providers/Providers'
import { Inter } from '@next/font/google'

const inter = Inter({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700']
})

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
