import { NextPage } from 'next'

import Meta from '@/ui/Meta'
import Layout from '@/ui/layout/Layout'
import Footer from '@/ui/layout/footer/Footer'

import Bag from '@/screens/bag/Bag'

const BagPage: NextPage = () => {
	return (
		<Meta title={'Shopping bag'}>
			<Layout inView={false}>
				<Bag />
			</Layout>
			<Footer />
		</Meta>
	)
}

export default BagPage
