import { FC } from 'react'

import { IProduct } from '@/types/product.interface'

import Heading from '../Heading'
import Loader from '../Loader'

import catalogStyle from './catalog.module.scss'
import ProductItem from './product-item/ProductItem'

interface ICatalog {
	products: IProduct[]
	isLoading?: boolean
	title?: string
}

const Catalog: FC<ICatalog> = ({ products, isLoading, title }) => {
	if (isLoading) return <Loader />
	return (
		<section className={catalogStyle.catalog}>
			{title && <Heading variant='catalog'>{title}</Heading>}
			{products.length ? (
				<div className={catalogStyle.items}>
					{products.map(product => (
						<ProductItem key={product.id} product={product} />
					))}
				</div>
			) : (
				<div>There are no products</div>
			)}
		</section>
	)
}

export default Catalog
