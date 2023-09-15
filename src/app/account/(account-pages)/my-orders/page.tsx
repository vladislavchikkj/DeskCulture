'use client'
import { useProfile } from '@/hooks/useProfile'
import { OrderService } from '@/services/order.service'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { FC } from 'react'
import Account from '../Account'
import accountStyle from '../account.module.scss'
import style from './my-orders.module.scss'
const MyOrdersPage: FC = () => {
	const { profile } = useProfile()
	const { data: orders } = useQuery(
		['my orders'],
		() => OrderService.getAll(),
		{
			select: ({ data }) => data
		}
	)
	return (
		<Account>
			<section>
				<h1 className={accountStyle.title}>Welcome, {profile?.name}!</h1>
				<span className={style.title}>You have {orders?.length} order.</span>
				{orders?.length ? (
					<div className={style.orders}>
						{orders.map(order => (
							<div key={order.id} className={style.order}>
								<div className={style.orderHeader}>
									<span>Order : {order.id}</span>
									<span>Status: {order.status}</span>
									<span>
										Date: {new Date(order.createdAt).toLocaleDateString()}
									</span>
									<span>Total price: {order.total}</span>
								</div>
								<div className={style.products}>
									{order.items.map(item => (
										<div className={style.product}>
											<Image
												width={150}
												height={150}
												className={style.orderImage}
												src={item.product.images[0]}
												alt={item.product.name}
											></Image>
											<div key={item.product.id}>{item.product.name}</div>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				) : (
					<div>
						<div className={accountStyle.subtitle}>No orders</div>
						<div className={accountStyle.info}>You have no orders to view</div>
					</div>
				)}
			</section>
		</Account>
	)
}

export default MyOrdersPage
