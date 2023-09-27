'use client'
import { Metadata } from 'next'
import { FC, useState } from 'react'
import Account from '../Account'
import accountStyle from '../account.module.scss'
import CatalogSettings from './(catalog)/CatalogSettings'
import Dashboard from './(dashboard)/Dashboard'
import Users from './(users)/Users'
import style from './admin-panel.module.scss'
import OrdersInfo from './(orders)/OrdersInfo'

export const metadata: Metadata = {
	description: 'DeskCulture',
	title: 'Admin Panel'
}

const AdminPanel: FC = () => {
	const [selectedTab, setSelectedTab] = useState<
		'dashboard' | 'users' | 'catalog' | 'orders'
	>('dashboard')

	const renderContent = () => {
		switch (selectedTab) {
			case 'dashboard':
				return <Dashboard />
			case 'users':
				return <Users />
			case 'catalog':
				return <CatalogSettings />
			case 'orders':
				return <OrdersInfo />
			default:
				return null
		}
	}

	return (
		<Account>
			<h1 className={accountStyle.title}>Admin panel</h1>
			<div className={style.menu}>
				<div onClick={() => setSelectedTab('dashboard')}>Dashboard</div>
				<div onClick={() => setSelectedTab('users')}>Users</div>
				<div onClick={() => setSelectedTab('catalog')}>Catalog</div>
				<div onClick={() => setSelectedTab('orders')}>Orders</div>
			</div>
			<div className={style.content}>{renderContent()}</div>
		</Account>
	)
}

export default AdminPanel
