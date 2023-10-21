import Link from 'next/link'
import { Dispatch, FC, SetStateAction } from 'react'

import { ICartItem } from '@/types/cart.interface'

import { convertPrice } from '@/utils/convertPrice'

import CartActions from './cart-actions/CartActions'
import style from './cartitem.module.scss'

type props = {
	item: ICartItem
	setIsShow: Dispatch<SetStateAction<boolean>>
	isShowCard?: Boolean
}
const CartItem: FC<props> = ({ item, isShowCard, setIsShow }) => {
	return (
		<div className={style.wrapper}>
			<Link
				onClick={() => {
					setIsShow(!isShowCard)
				}}
				href={`/catalog/products/${item.product.slug}`}
			>
				<img
					className={style.image}
					src={item.product.images[0]}
					alt={item.product.name}
				/>
			</Link>

			<div className={style.info}>
				<div>
					<div className={style.name}>{item.product.name}</div>
					<div className={style.type}>Color: {item.color}</div>
					<div className={style.type}>Type: {item.type}</div>
					<div className={style.price}>{convertPrice(item.product.price)}</div>
				</div>

				<CartActions item={item} />
			</div>
		</div>
	)
}

export default CartItem
