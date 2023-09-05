import { NO_INDEX_PAGE } from '@/constants/app.constants'
import Heading from '@/ui/common/heading/Heading'
import Footer from '@/ui/layout/footer/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Recovery',
	...NO_INDEX_PAGE
}

export default function RecoveryPage() {
	// const { updateLayout } = useLayout()
	// updateLayout(false)
	return (
		<>
			<div className='container-f'>
				<Heading variant='auth' className='mt-40'>
					Recovery Password Page
				</Heading>
				<span>Add info for the recovery.</span>
			</div>
			<Footer home={true} />
		</>
	)
}
