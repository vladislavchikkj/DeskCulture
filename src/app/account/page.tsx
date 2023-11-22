import { ICON_PATH } from '@/constants/favicon.constant'
import type { Metadata } from 'next'
import Account from './(account-pages)/Account'
import style from './(account-pages)/my-orders/my-orders.module.scss'

export const metadata: Metadata = {
	title: 'Account',
	icons: {
		icon: ICON_PATH,
		shortcut: ICON_PATH,
		apple: ICON_PATH,
		other: {
			rel: ICON_PATH,
			url: ICON_PATH
		}
	}
}
export default async function AccountPage() {
	return (
		<>
			<Account>
				<h1 className={style.title}>Account</h1>
			</Account>
		</>
	)
}
