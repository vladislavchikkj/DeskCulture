'use client'
import { FC } from 'react'
import accountStyle from '../../account.module.scss'
import style from './orders.module.scss'
const OrdersInfo: FC = () => {
	return (
		<div className={style.orders}>
			<h1 className={accountStyle.title}>Orders</h1>
		</div>
	)
}

export default OrdersInfo
