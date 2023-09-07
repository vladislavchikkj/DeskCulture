import { FC } from 'react'

import { IProduct } from '@/types/product.interface'
import style from './product-info.module.scss'
type props = {
	product: IProduct
}
const ProductInfo: FC<props> = ({ product }) => {
	return <div className={style.info}>{product.description}</div>
}

export default ProductInfo
