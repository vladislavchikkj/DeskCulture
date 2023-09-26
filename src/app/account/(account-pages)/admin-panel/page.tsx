'use client'
import { Metadata } from 'next'
import { FC } from 'react'
import Account from '../Account'

export const metadata: Metadata = {
	description: 'DeskCulture',
	title: 'Admin Panel'
}

const AdminPanel: FC = () => {
	return (
		<Account>
			<div>Add product</div>
			<div>Add category</div>
			<div>Add setup</div>
		</Account>
	)
}

export default AdminPanel
