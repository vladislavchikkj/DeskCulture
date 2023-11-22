'use client'
import { FC, SetStateAction, useEffect } from 'react'

import CartItem from '@/ui/common/cart/cart-item/CartItem'

import { useCart } from '@/hooks/useCart'

import { convertPrice } from '@/utils/convertPrice'

import AuthButton from '../../auth/authButton/authButton'

import { baseAnimation } from '@/components/animations/baseAnimation'
import { useLayout } from '@/components/context/LayoutContext'
import { motion } from 'framer-motion'

import Detail from '@/app/catalog/(dynamic)/products/product/details/Detail'
import Link from 'next/link'
import style from './bag.module.scss'

const Bag: FC = () => {
	const { items, total } = useCart()
	//решить проблему с дублирование
	const { updateLayout } = useLayout()
	useEffect(() => {
		updateLayout(false)
	}, [])

	return (
		<motion.div
			initial='hidden'
			whileInView='visible'
			variants={baseAnimation}
			className={`${style.container} container-f`}
		>
			<div className={style.wrapper}>
				<div className={style.title}>Shopping bag</div>
				<div className={style.cartLayout}>
					<div className={style.cart}>
						{items.length ? (
							items.map(item => (
								<div key={item.id} className={style.item}>
									<CartItem
										item={item}
										key={item.product.id}
										setIsShow={function (value: SetStateAction<boolean>): void {
											throw new Error('Function not implemented.')
										}}
									/>
								</div>
							))
						) : (
							<div>YOUR BAG IS EMPTY</div>
						)}
					</div>
					<div className={style.cartInfo}>
						<div className={style.productsPrice}>
							<div>Products</div>
							<div>{convertPrice(total)}</div>
						</div>
						<div className={style.salesTax}>
							<div>Sales Tax</div>
							<div>$0.00</div>
						</div>
						<div className={style.total}>
							<div>Total (incl. sales tax)</div>
							<div className={style.totalPrice}>{convertPrice(total)}</div>
						</div>
						<Link className={style.checkout} href={'./checkout'}>
							<AuthButton variant={'black'}>checkout</AuthButton>
						</Link>
						<div className={style.otherInfo}>
							<Detail
								title={'SHIPPING FEES & TIMING'}
								content={
									'Arrival within 10-15 business days. Tracking details will be included in the shipping confirmation e-mail.'
								}
							/>
							<Detail
								title={'RETURNS & EXCHANGES'}
								content={
									'You must notify us within thirty (30) days of the date of receipt of your confirmation email if you believe all or part of your order is missing or damaged. \n\n You may request a refund or exchange if the items in your order are damaged or faulty upon receipt, or if the items you have received are not those you originally ordered. \n\n Items must be returned to us within thirty (30) calendar days from the delivery date in the exact condition in which they were received. \n\n We will dispatch replacement items to you upon confirmation of the issue with your order following a quality assurance inspection. \n\n Refunds can take up to 14 days to process following receipt of your return. \n\n Refunds will be issued to the original method of payment, unless otherwise requested and agreed to.'
								}
							/>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	)
}

export default Bag
