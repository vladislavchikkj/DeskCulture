import Link from 'next/link'
import { FC } from 'react'

import { IProduct } from '@/types/product.interface'

import { shimmer, toBase64 } from '@/components/common'
import Image from 'next/image'
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
									<Image
										width={1000}
										height={1000}
										className={style.image}
										src={product.images[0]}
										alt={product.name}
										placeholder={`data:image/svg+xml;base64,${toBase64(
											shimmer(700, 475)
										)}`}
										style={{
											maxWidth: '100%',
											height: 'auto'
										}}
									/>
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
