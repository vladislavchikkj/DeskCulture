'use client'
import { FC, SetStateAction, useEffect } from 'react'

import CartItem from '@/ui/common/cart/cart-item/CartItem'

import { useCart } from '@/hooks/useCart'

import { convertPrice } from '@/utils/convertPrice'

import AuthButton from '../../auth/authButton/authButton'

import { baseAnimation } from '@/components/animations/baseAnimation'
import { useLayout } from '@/components/context/LayoutContext'
import { useActions } from '@/hooks/useActions'
import { OrderService } from '@/services/order.service'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import style from './bag.module.scss'

const Bag: FC = () => {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const { items, total } = useCart()
	const { reset } = useActions()
	const { push } = useRouter()

	//решить проблему с дублирование
	const { updateLayout } = useLayout()
	useEffect(() => {
		updateLayout(false)
	}, [])
	useEffect(() => {
		if (pathname.startsWith('/confirmation-url/')) {
			reset()
		}
	}, [pathname, reset])
	const { mutate } = useMutation(
		['create order and payment'],
		() =>
			OrderService.place({
				items: items.map(item => ({
					price: item.price,
					quantity: item.quantity,
					productId: item.product.id
				}))
			}),
		{
			onSuccess({ data }) {
				//  @ts-ignore
				push(data.confirmationUrl.confirmationUrl.url)
			}
		}
	)

	return (
		<motion.div
			initial='hidden'
			whileInView='visible'
			variants={baseAnimation}
			className='container-f'
		>
			<div className={style.wrapper}>
				<div className={style.title}>Shopping bag</div>
				<div className={style.cartLayout}>
					<div className={style.cart}>
						{items.length ? (
							items.map(item => (
								<CartItem
									item={item}
									key={item.product.id}
									setIsShow={function (value: SetStateAction<boolean>): void {
										throw new Error('Function not implemented.')
									}}
								/>
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
							<div>$10.00</div>
						</div>
						<div className={style.total}>
							<div>Total (incl. sales tax)</div>
							<div className={style.totalPrice}>{convertPrice(total + 10)}</div>
						</div>
						<AuthButton onClick={() => mutate()} variant={'black'}>
							checkout
						</AuthButton>
						<div className={style.otherInfo}>
							<div className={style.otherInfoList}>
								<span>SHIPPING FEES & TIMING</span>
								<span>{'›'}</span>
							</div>
							<div className={style.otherInfoList}>
								<span>RETURNS & EXCHANGES</span>
								<span>{'›'}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	)
}

export default Bag
