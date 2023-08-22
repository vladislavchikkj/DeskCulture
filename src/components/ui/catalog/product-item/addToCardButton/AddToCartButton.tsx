import React, { FC } from 'react'
import { RiShoppingCartFill, RiShoppingCartLine } from 'react-icons/ri'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

import { IProduct } from '@/types/product.interface'

import { default as style } from './addToCartButton.module.scss'

type props = {
	product: IProduct
	children?: React.ReactNode
}

const AddToCartButton: FC<props> = ({ product, children }) => {
	const { addToCart, removeFromCart } = useActions()
	const { items } = useCart()

	const currentElement = items.find(
		cartItem => cartItem.product.id === product.id
	)
	return (
		<>
			<button
				className={style.btn}
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
				<span className={style.btnText}>
					{!children ? 'Buy now' : children}
				</span>
			</button>
		</>
	)
}

export default AddToCartButton
