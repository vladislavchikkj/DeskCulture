'use client'
import { useProfile } from '@/hooks/useProfile'
import { OrderService } from '@/services/order.service'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
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
								<div className={style.orderCard}>
									<span className={style.orderDate}>
										{new Intl.DateTimeFormat('en-US', {
											weekday: 'long',
											year: 'numeric',
											month: 'long',
											day: 'numeric'
										}).format(new Date(order.createdAt))}
									</span>
									<div className={style.orderHeader}>
										<span className={style.orderTitle}>ORDER #{order.id}</span>
										<span className={style.orderItemsLength}>
											{order.items.length} items
										</span>
									</div>
								</div>
								<div className={style.products}>
									{order.items.map((item, index) => (
										<Link
											key={index}
											href={`/catalog/products/${item.product.slug}`}
										>
											<div className={style.product}>
												<Image
													width={200}
													height={200}
													className={style.orderImage}
													src={item.product.images[0]}
													alt={item.product.name}
												></Image>
											</div>
										</Link>
									))}
								</div>
								<div className={style.orderInfo}>
									<span className={style.showDetailBtn}>SHOW DETAILS</span>
									<span className={style.status}>Status: {order.status}</span>
									<span className={style.total}>${order.total}</span>
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
