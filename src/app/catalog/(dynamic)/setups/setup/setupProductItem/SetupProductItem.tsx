import Link from 'next/link'
import { FC } from 'react'

import { IProduct } from '@/types/product.interface'

import style from './setupProductItem.module.scss'

type props = {
	products: IProduct[]
}
const SetupProductItem: FC<props> = ({ products }) => {
	return (
		<div className={style.setupItems}>
			{products.map(product => (
				<div key={product.id} className={`${style.searchItem}`}>
					<Link href={`/catalog/products/${product.slug}`}>
						<div className={style.setupItem}>
							<div className={style.setupItemWrapper}>
								<div className={style.prodImg}>
									<img src={product.images[0]} alt={product.name} />
								</div>
								<div>
									<div className={style.prodName}>{product.name}</div>
									<div className={style.prodPrice}>{product.price}$</div>
								</div>
							</div>
							<div className={style.arr}>+</div>
						</div>
					</Link>
				</div>
			))}
		</div>
	)
}

export default SetupProductItem
