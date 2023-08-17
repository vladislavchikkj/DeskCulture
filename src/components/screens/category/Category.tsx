import { FC } from 'react'

import ProductList from '@/ui/catalog/productsList/ProductList'

import { ICategory } from '@/types/category.interface'
import { IProduct } from '@/types/product.interface'

import style from './category.module.scss'

type props = {
	products: IProduct[]
	category: ICategory
}

const Category: FC<props> = ({ products, category }) => {
	console.log(products)
	return (
		<div className={style.category}>
			<div className={style.intro}>
				<img className={style.image} src={category.image} alt={category.name} />
				<div className={`${style.name} container-f`}>{category.name}</div>
			</div>
			<div className={`${style.title} container-f`}>All Products</div>
			<div className='container-f'>
				<ProductList
					initialProducts={products}
					slug={category.slug}
					DropdownOff={true}
					loadMoreBtnOff={true}
					needToUpdate={false}
				/>
			</div>
		</div>
	)
}

export default Category
