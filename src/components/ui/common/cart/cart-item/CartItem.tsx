import { FC } from 'react'

import { ICartItem } from '@/types/cart.interface'

import { convertPrice } from '@/utils/convertPrice'

import CartActions from './cart-actions/CartActions'
import style from './cartitem.module.scss'

const CartItem: FC<{ item: ICartItem }> = ({ item }) => {
	return (
		<div className={style.wrapper}>
			<img
				className={style.image}
				src={item.product.images[0]}
				alt={item.product.name}
			/>
			<div className={style.info}>
				<div>
					<div className={style.name}>{item.product.name}</div>
					<div className={style.price}>{convertPrice(item.product.price)}</div>
				</div>

				<CartActions item={item} />
			</div>
		</div>
	)
}

export default CartItem
