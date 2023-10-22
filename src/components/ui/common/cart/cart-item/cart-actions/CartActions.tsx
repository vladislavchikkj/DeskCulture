import { FC } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

import { ICartItem } from '@/types/cart.interface'

import style from './cartactions.module.scss'

const CartActions: FC<{ item: ICartItem }> = ({ item }) => {
	const { removeFromCart, changeQuantity } = useActions()
	const { items } = useCart()
	const quantity = items.find(cartItem => cartItem.id === item.id)?.quantity
	return (
		<div>
			<div className={style.counterWr}>
				<button
					className={style.remove}
					onClick={() => removeFromCart({ id: item.id })}
				>
					remove
				</button>
				<div className={style.counter}>
					<button
						onClick={() => changeQuantity({ id: item.id, type: 'minus' })}
						disabled={quantity === 1}
					>
						<FiMinus fontSize={13} />
					</button>
					<div>{quantity}</div>
					<button onClick={() => changeQuantity({ id: item.id, type: 'plus' })}>
						<FiPlus fontSize={13} />
					</button>
				</div>
			</div>
		</div>
	)
}

export default CartActions
