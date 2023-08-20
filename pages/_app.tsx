import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import Layout from '@/ui/layout/Layout'

import AuthProvider from '@/providers/auth-provider/AuthProvider'
import { TypeComponentAuthFields } from '@/providers/auth-provider/auth-page.types'

import '@/assets/styles/globals.scss'

import { persistor, store } from '@/store/store'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

export default function App({
	Component,
	pageProps
}: AppProps & TypeComponentAuthFields) {
	const router = useRouter()
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<AuthProvider Component={{ isOnlyUser: Component.isOnlyUser }}>
						<Layout>
							<Component {...pageProps}></Component>
						</Layout>
					</AuthProvider>
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	)
}
