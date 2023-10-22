'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Layout from '@/ui/layout/Layout'

import { CheckoutProvider } from '@/components/context/CheckoutContext'
import { LayoutProvider } from '@/components/context/LayoutContext'
import { persistor, store } from '@/store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import AuthProvider from './auth-provider/AuthProvider'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

export default function Providers({ children }: { children: React.ReactNode }) {
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
