'use client' // indicates Client Component

// Import with next's dynamic import
import '@/assets/styles/globals.scss'
import Providers from '@/providers/Providers'
import { Inter } from '@next/font/google'
import dynamic from 'next/dynamic'

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
	ssr: false
})

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
			<body className={inter.className}>
				<Providers>{children}</Providers>
				<div id='PopUp'></div>
				<div id='modal'></div>
				<div id='notifications'></div>
				<div id='lowbar'></div>
				{/* @ts-ignore */}
				<AnimatedCursor
					innerSize={6}
					outerSize={55}
					innerScale={1}
					outerScale={2}
					outerAlpha={0}
					// @ts-ignore
					hasBlendMode={true}
					innerStyle={{
						backgroundColor: 'var(--cursor-color)',
						mixBlendMode: 'exclusion',
						zIndex: '9999'
					}}
					outerStyle={{
						border: '3px solid var(--black)',
						backgroundColor: 'var(--black)',
						mixBlendMode: 'exclusion',
						zIndex: '9999'
					}}
				/>
			</body>
		</html>
	)
}
