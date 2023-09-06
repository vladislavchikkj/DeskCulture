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
	variatn?: boolean
}

const AddToCartButton: FC<props> = ({ product, children, variatn }) => {
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
				<div>{currentElement ? <BagSvgFilled /> : <BagSvgEmpty />}</div>
				{children && <span className={style.btnText}>{children}</span>}
			</button>
		</>
	)
}

export default AddToCartButton
