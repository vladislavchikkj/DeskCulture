'use client'
import { FC } from 'react'
import accountStyle from '../../account.module.scss'
import style from './dashboard.module.scss'
import ItemsSVG from './icon/list-items.svg'
import OrdersSVG from './icon/order.svg'
import UsersSVG from './icon/users.svg'
const Dashboard: FC = () => {
	return (
		<>
			<h1 className={accountStyle.title}>Dashboard</h1>
			<div className={style.dashboard}>
				<div className={style.box}>
					<div className={style.boxImg}>
						<UsersSVG />
					</div>
					<div>
						<span>Total users: </span>
						<span className={style.users}>4</span>
					</div>
				</div>
				<div className={style.box}>
					<div className={style.boxImg}>
						<OrdersSVG />
					</div>
					<div>
						<span>Total orders: </span>
						<span className={style.orders}>15</span>
					</div>
				</div>
				<div className={style.box}>
					<div className={style.boxImg}>
						<ItemsSVG />
					</div>
					<div>
						<span>Total items: </span>
						<span className={style.items}>10</span>
					</div>
				</div>
			</div>
		</>
	)
}

export default Dashboard
