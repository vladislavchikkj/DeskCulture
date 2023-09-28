import { Metadata } from 'next'
import Account from '../Account'
import accountStyle from '../account.module.scss'
import style from './admin-panel.module.scss'

export const metadata: Metadata = {
	description: 'DeskCulture',
	title: 'Admin Panel'
}

export default async function AdminPanel() {
	return (
		<Account>
			<h1 className={accountStyle.title}>Admin panel</h1>
			<div className={style.content}>Some admin info</div>
		</Account>
	)
}
