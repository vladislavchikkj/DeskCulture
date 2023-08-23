import { NextPage } from 'next'

import { useLayout } from '@/components/context/LayoutContext'

import Meta from '@/ui/Meta'
import Footer from '@/ui/layout/footer/Footer'

import Bag from '@/screens/bag/Bag'

const BagPage: NextPage = () => {
	const { layout, updateLayout } = useLayout()
	updateLayout(false)
	return (
		<Meta title={'Shopping bag'}>
			<Bag />
			<Footer />
		</Meta>
	)
}

export default BagPage
