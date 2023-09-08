import { FC } from 'react'

import Button from '@/ui/common/buttons/Button'

import { IProduct } from '@/types/product.interface'
import ProductList from '@/ui/catalog/productsList/ProductList'
import Link from 'next/link'
import style from './homereviews.module.scss'

const HomeReviews: FC<{ products: IProduct[] }> = products => {
	console.log(products.products)
	return (
		<>
			<div className={`${style.reviews}  container-f`}>
				<div className={style.reviews__header}>
					<span className={style.reviews__title}>Best seller</span>
					<Link href={'/catalog/products'}>
						<Button data-hover='See More' variant='grey'>
							See More
						</Button>
					</Link>
				</div>
				<div className={style.reviews__items}>
					<ProductList
						initialProducts={products.products}
						needToUpdate={false}
						loadMoreBtnOff
						DropdownOff
					/>
				</div>
			</div>
		</>
	)
}
export default HomeReviews
