'use client'
import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'
import { IOrderWithPerson } from '@/services/order.interface'
import { OrderService } from '@/services/order.service'
import Modal from '@/ui/common/modal/Modal'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import accountStyle from '../../account.module.scss'
import ShowDelailsModal from './(showDetailsModal)/ShowDelailsModal'
import style from './orders.module.scss'

const OrdersInfo: FC = () => {
	const { profile } = useProfile()
	const { user } = useAuth()
	const { data: orders } = useQuery(
		['all orders'],
		() => OrderService.getAllOrders(),
		{
			select: ({ data }) => data
		}
	)

	const [isModalOpen, setModalOpen] = useState(false)
	const [selectedOrder, setSelectedOrder] = useState<IOrderWithPerson | null>(
		null
	)

	if (!orders) return <div>no active orders</div>

	return (
		<section>
			{user && (
				<Modal isOpen={isModalOpen} closeModal={() => setModalOpen(false)}>
					<ShowDelailsModal order={selectedOrder} />
				</Modal>
			)}
			<h1 className={accountStyle.title}>Welcome, {profile?.name}!</h1>
			<span className={style.title}>We have {orders?.length} order.</span>
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
								<span
									onClick={() => {
										setSelectedOrder(order)
										setModalOpen(true)
									}}
									className={style.showDetailBtn}
								>
									SHOW DETAILS
								</span>
								<span className={style.status}>
									<span>
										Status:
										<span className={style.textPayed}> {order.status}</span>
									</span>
									{order.status === 'PENDING' && (
										<Link href={order.paymentUrl}>
											<span className='text-darkBlue cursor-pointer'>
												Сontinue payment
											</span>
										</Link>
									)}
								</span>
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
	)
}

export default OrdersInfo
