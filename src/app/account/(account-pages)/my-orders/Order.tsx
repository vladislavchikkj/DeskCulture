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
import ShowDelailsModal from './(showDetailsModal)/ShowDelailsModal'
import style from './my-orders.module.scss'

const Order: FC = () => {
	const { profile } = useProfile()
	const { user } = useAuth()
	const { data: orders } = useQuery(
		['my orders'],
		() => OrderService.getAll(),
		{
			select: ({ data }) => data
		}
	)

	const [isModalOpen, setModalOpen] = useState(false)
	const [selectedOrder, setSelectedOrder] = useState<IOrderWithPerson | null>(
		null
	)

	const lastOrder = orders && orders[0]

	if (!user)
		return (
			<div className={style.message}>
				<Link href={'/auth'}>
					Register or log in to see the list of orders...
				</Link>
			</div>
		)
	if (!orders)
		return <div className={style.message}>The order has not been created.</div>
	return (
		<div className={style.orders}>
			{user && (
				<Modal isOpen={isModalOpen} closeModal={() => setModalOpen(false)}>
					<ShowDelailsModal order={selectedOrder} />
				</Modal>
			)}
			{lastOrder && (
				<div key={lastOrder.id} className={style.order}>
					<div className={style.orderCard}>
						<span className={style.orderDate}>
							{new Intl.DateTimeFormat('en-US', {
								weekday: 'long',
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							}).format(new Date(lastOrder.createdAt))}
						</span>
						<div className={style.orderHeader}>
							<span className={style.orderTitle}>ORDER #{lastOrder.id}</span>
							<span className={style.orderItemsLength}>
								{lastOrder.items.length} items
							</span>
						</div>
					</div>
					<div className={style.products}>
						{lastOrder.items.map((item, index) => (
							<Link key={index} href={`/catalog/products/${item.product.slug}`}>
								<div className={style.product}>
									<Image
										width={200}
										height={200}
										className={style.orderImage}
										src={item.product.images[0]}
										alt={item.product.name}
									></Image>
									<div className={style.prodName}>
										<div>{item.product.name}</div>
										{item.colorVariantName ? (
											<div className={style.orderItemsLength}>
												Color: {item.colorVariantName}
											</div>
										) : null}
									</div>
								</div>
							</Link>
						))}
					</div>
					<div className={style.orderInfo}>
						<span
							onClick={() => {
								setSelectedOrder(lastOrder)
								setModalOpen(true)
							}}
							className={style.showDetailBtn}
						>
							SHOW DETAILS
						</span>
						<span className={style.status}>
							Status: {lastOrder.status}
							{lastOrder.status === 'PENDING' && (
								<Link href={lastOrder.paymentUrl}>
									<span className='text-darkBlue cursor-pointer'>
										Continue payment
									</span>
								</Link>
							)}
						</span>
						<span className={style.total}>${lastOrder.total}</span>
					</div>
				</div>
			)}
		</div>
	)
}

export default Order
