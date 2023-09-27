'use client'
import { useAdmin } from '@/hooks/useAdmin'
import { Metadata } from 'next'
import { FC } from 'react'
import Account from '../Account'
import accountStyle from '../account.module.scss'
import Users from './(users)/Users'
import style from './admin-panel.module.scss'

export const metadata: Metadata = {
	description: 'DeskCulture',
	title: 'Admin Panel'
}

const AdminPanel: FC = () => {
	return (
		<Account>
			<h1 className={accountStyle.title}>Admin panel</h1>
			<div className={style.menu}>
				<div>Dashboard</div>
				<div>Users</div>
				<div>Catalog</div>
				<div>Orders</div>
			</div>
			<div className={style.content}>
				{/* <Dashboard /> */}
				<Users />
			</div>
		</Account>
	)
}

export default AdminPanel
