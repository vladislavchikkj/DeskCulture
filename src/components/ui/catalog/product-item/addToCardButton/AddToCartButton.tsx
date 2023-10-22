import React, { FC } from 'react'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

import { IProduct } from '@/types/product.interface'

import { default as style } from './addToCartButton.module.scss'
import BagSvgEmpty from './svg/bag-empty.svg'
import BagSvgFilled from './svg/bag-filled.svg'

type props = {
	product: IProduct
	children?: React.ReactNode
	variant?: boolean
	color?: string
	type?: string
}

const AddToCartButton: FC<props> = ({
	product,
	children,
	variant,
	color,
	type
}) => {
	const { addToCart, removeFromCart } = useActions()
	const { items } = useCart()

	const currentElement = items.find(
		cartItem =>
			cartItem.product.id === product.id &&
			cartItem.color === color &&
			cartItem.type === type
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
								price: product.price,
								color: color,
								type: type
						  })
				}
			>
				<div>{currentElement ? <BagSvgFilled /> : <BagSvgEmpty />}</div>
				{children && <span className={style.btnText}>{children}</span>}
			</button>
		</>
	)
}

export default AddToCartButton
