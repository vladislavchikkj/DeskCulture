'use client'
import { useProfile } from '@/hooks/useProfile'
import { FC } from 'react'
import Account from '../Account'
import style from '../account.module.scss'
const MyOrdersPage: FC = () => {
	const { profile } = useProfile()

	return (
		<Account>
			<div>
				<h1 className={style.title}>Welcome, {profile?.name}!</h1>
				<div className={style.subtitle}>No orders</div>
				<div className={style.info}>You have no orders to view</div>
			</div>
		</Account>
	)
}

export default MyOrdersPage
