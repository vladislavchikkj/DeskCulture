'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Layout from '@/ui/layout/Layout'

import { CheckoutProvider } from '@/components/context/CheckoutContext'
import { LayoutProvider } from '@/components/context/LayoutContext'
import useCustomMediaQuery from '@/hooks/useCustomMediaQuery'
import { persistor, store } from '@/store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import AuthProvider from './auth-provider/AuthProvider'
// import dynamic from 'next/dynamic'

// const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
// 	ssr: false
// })

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

export default function Providers({ children }: { children: React.ReactNode }) {
	const device = useCustomMediaQuery()
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				{/* @ts-ignore */}
				<PersistGate loading={null} persistor={persistor}>
					<CheckoutProvider>
						<AuthProvider>
							<LayoutProvider>
								<Layout>{children}</Layout>
							</LayoutProvider>
						</AuthProvider>
					</CheckoutProvider>
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	)
}

// mb future

// {device != 'mobile_m' && device != 'mobile_s' && (
// 	<>
// 		{/* @ts-ignore */}
// 		<AnimatedCursor
// 			showSystemCursor={true}
// 			innerSize={0}
// 			outerSize={4}
// 			innerScale={1}
// 			outerScale={30}
// 			outerAlpha={10}
// 			// @ts-ignore
// 			hasBlendMode={true}
// 			innerStyle={{
// 				backgroundColor: 'var(--cursor-color)',
// 				mixBlendMode: 'exclusion',
// 				zIndex: '9999'
// 			}}
// 			outerStyle={{
// 				border: '3px solid var(--black)',
// 				backgroundColor: 'var(--black)',
// 				mixBlendMode: 'exclusion',
// 				zIndex: '9999'
// 			}}
// 		/>
// 	</>
// )}
