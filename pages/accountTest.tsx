import { NextPage } from 'next'

import { useLayout } from '@/components/context/LayoutContext'

import Meta from '@/ui/Meta'
import Footer from '@/ui/layout/footer/Footer'

import Account from '@/screens/account/Account'

const AccountPage: NextPage = () => {
	const { layout, updateLayout } = useLayout()
	updateLayout(false)
	return (
		<Meta title={'Account'}>
			<Account children={undefined} />
			<Footer />
		</Meta>
	)
}

export default AccountPage
