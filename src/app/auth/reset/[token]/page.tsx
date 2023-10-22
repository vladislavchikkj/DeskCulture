import { NO_INDEX_PAGE } from '@/constants/app.constants'
import Heading from '@/ui/common/heading/Heading'
import Footer from '@/ui/layout/footer/Footer'
import { Metadata } from 'next'
import Reset from './Reset'
import { useSearchParams } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Reset',
	...NO_INDEX_PAGE
}

export default function ResetPage() {
	return (
		<>
			<Heading variant='auth' className='mt-40'>
				Reset your password
			</Heading>
			<Reset />
			<Footer />
		</>
	)
}
