import type { Metadata } from 'next'
import Account from './(account-pages)/Account'
import style from './(account-pages)/my-orders/my-orders.module.scss'

export const metadata: Metadata = {
	title: 'Account'
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
