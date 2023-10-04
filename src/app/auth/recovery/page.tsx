import { NO_INDEX_PAGE } from '@/constants/app.constants'
import Heading from '@/ui/common/heading/Heading'
import Footer from '@/ui/layout/footer/Footer'
import { Metadata } from 'next'
import Recovery from './Recovery'

export const metadata: Metadata = {
	title: 'Recovery',
	...NO_INDEX_PAGE
}

export default function RecoveryPage() {
	return (
		<>
			<Heading variant='auth' className='mt-40'>
				Recovery Password Page
			</Heading>
			<Recovery />
			<Footer />
		</>
	)
}
