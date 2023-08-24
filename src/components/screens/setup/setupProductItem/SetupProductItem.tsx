import Link from 'next/link'
import { FC } from 'react'

import { IProduct } from '@/types/product.interface'

import style from './setupProductItem.module.scss'

type props = {
	products: IProduct[]
}
const SetupProductItem: FC<props> = ({ products }) => {
	const ItemAnimation = {
		hidden: {
			height: 0,
			opacity: 0,
			paddingTop: 0,
			transition: { duration: 0.4 }
		},
		visible: (custom: number) => ({
			opacity: 1,
			height: '15vh',
			paddingTop: '1.5vh',
			transition: { duration: 0.4, delay: custom * 0.2 }
		})
	}

	return (
		<div className={style.setupItems}>
			{products.map(product => (
				<div key={product.id} className={`${style.searchItem}`}>
					<Link href={`/products/${product.slug}`}>
						<div className={style.setupItem}>
							<div className={style.prodName}>{product.name}</div>
							<div className={style.arr}>+</div>
						</div>
					</Link>
				</div>
			))}
		</div>
	)
}

export default SetupProductItem
