import { FC } from 'react'

import { IProduct } from '@/types/product.interface'

import style from './product.module.scss'

type props = {
	product: IProduct
}

const Products: FC<props> = ({ product }) => {
	return (
		<div className={style.product}>
			<div>{product.price}</div>
		</div>
	)
}

export default Products
