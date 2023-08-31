import { NextPage } from 'next'

import Footer from '@/ui/layout/footer/Footer'

import Account from '@/screens/account/Account'

const AccountPage: NextPage = () => {
	// const { layout, updateLayout } = useLayout()
	// updateLayout(false)
	return (
		<>
			<Account children={undefined} />
			<Footer />
		</>
	)
}

export default AccountPage
