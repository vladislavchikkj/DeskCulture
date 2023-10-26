import Link from 'next/link'
import { Dispatch, FC, SetStateAction } from 'react'

import { ICartItem } from '@/types/cart.interface'

import { convertPrice } from '@/utils/convertPrice'

import { shimmer, toBase64 } from '@/components/common'
import Image from 'next/image'
import CartActions from './cart-actions/CartActions'
import style from './cartitem.module.scss'

type props = {
	item: ICartItem
	setIsShow: Dispatch<SetStateAction<boolean>>
	isShowCard?: Boolean
}
const CartItem: FC<props> = ({ item, isShowCard, setIsShow }) => {
	return (
		<div key={item.id} className={style.wrapper}>
			<Link
				onClick={() => {
					setIsShow(!isShowCard)
				}}
				href={`/catalog/products/${item.product.slug}`}
			>
				<Image
					width={500}
					height={500}
					className={style.image}
					src={item.product.images[0]}
					alt={item.product.name}
					placeholder={`data:image/svg+xml;base64,${toBase64(
						shimmer(700, 475)
					)}`}
					style={{
						maxWidth: '100%',
						height: 'auto'
					}}
				/>
			</Link>

			<div className={style.info}>
				<div>
					<div className={style.name}>{item.product.name}</div>
					{item.color && <div className={style.type}>Color: {item.color}</div>}
					{item.type && <div className={style.type}>Type: {item.type}</div>}
					<div className={style.price}>{convertPrice(item.product.price)}</div>
				</div>

				<CartActions item={item} />
			</div>
		</div>
	)
}

export default CartItem
