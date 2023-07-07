import { FC } from 'react'
import { RiShoppingCartFill, RiShoppingCartLine } from 'react-icons/ri'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

import { IProduct } from '@/types/product.interface'

import buttonAdd from './addToCartButton.module.scss'

const AddToCartButton: FC<{ product: IProduct }> = ({ product }) => {
	const { addToCart, removeFromCart } = useActions()
	const { items } = useCart()

	const currentElement = items.find(
		cartItem => cartItem.product.id === product.id
	)
	return (
		<div>
			<button
				className={buttonAdd.btn}
				onClick={() =>
					currentElement
						? removeFromCart({
								id: currentElement.id
						  })
						: addToCart({
								product,
								quantity: 1,
								price: product.price
						  })
				}
			>
				<div>
					{currentElement ? <RiShoppingCartFill /> : <RiShoppingCartLine />}
				</div>
				<span>Buy now</span>
			</button>
		</div>
	)
}

export default AddToCartButton
