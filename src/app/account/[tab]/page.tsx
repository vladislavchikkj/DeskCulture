import { PageProps } from '@/../.next/types/app/layout'
import Account from '@/screens/account/Account'
import Footer from '@/ui/layout/footer/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Account |'
}

interface pageProps {
	params: { tag: string }
}

export default async function AccountPage({ params }: PageProps) {
	return (
		<>
			<Account tag={params} />
			<Footer />
		</>
	)
}
