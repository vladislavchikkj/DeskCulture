import { FC } from 'react'

import Button from '@/ui/common/buttons/Button'

import { IProduct } from '@/types/product.interface'
import ProductList from '@/ui/catalog/productsList/ProductList'
import Link from 'next/link'
import style from './bestSellers.module.scss'

const BestSellers: FC<{ products: IProduct[] }> = products => {
	return (
		<div className={`${style.reviews}  container-f`}>
			<div className={style.reviews__header}>
				<span className={style.reviews__title}>BEST SELLER</span>
				<Link href={'/catalog/products'}>
					<Button data-hover='See More' variant='grey'>
						See More
					</Button>
				</Link>
			</div>
			<div className={style.reviews__items}>
				<ProductList
					initialProducts={products.products}
					loadMoreBtnOff
					DropdownOff
					descr
					needToUpdate={false}
				/>
			</div>
		</div>
	)
}
export default BestSellers
