import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import Layout from '@/ui/layout/Layout'

import AuthProvider from '@/providers/auth-provider/AuthProvider'

import { persistor, store } from '@/store/store'

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
				<PersistGate loading={null} persistor={persistor}>
					<AuthProvider>
						{/* <LayoutProvider> */}
						<Layout>{children}</Layout>
						{/* </LayoutProvider> */}
					</AuthProvider>
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	)
}
