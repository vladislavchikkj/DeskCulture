import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Meta from '@/ui/Meta'
import Footer from '@/ui/layout/footer/Footer'

import AccountSettingsPage from './account-settings'
import ChangePasswordPage from './change-password'
import MyOrdersPage from './my-orders'
import Account from '@/screens/account/Account'

const AccountTab: NextPage = () => {
	const router = useRouter()
	const { tab } = router.query
	console.log(tab)
	let content = null

	if (tab === 'my-orders') {
		content = <MyOrdersPage />
	} else if (tab === 'account-settings') {
		content = <AccountSettingsPage />
	} else if (tab === 'change-password') {
		content = <ChangePasswordPage />
	}

	return (
		<Meta title={'Account'}>
			<Account>{content}</Account>
			<Footer />
		</Meta>
	)
}

export default AccountTab
