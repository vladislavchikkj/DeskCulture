import Image from 'next/image'
import { FC } from 'react'

import { IProduct } from '@/types/product.interface'

import AddToCartButton from './AddToCartButton'
import FavoriteButton from './FavoriteButton'
import ProductRating from './ProductRating'

const ProductItem: FC<{ product: IProduct }> = ({ product }) => {
	return (
		<div>
			<div>
				<FavoriteButton productId={product.id} />
				<AddToCartButton product={product} />
				<Image
					width={440}
					height={220}
					src={product.images[0]}
					alt={product.name}
				></Image>
			</div>
			<h3>{product.name}</h3>
			<div>{product.category.name}</div>
			<ProductRating product={product} />
			<div>{product.price}</div>
		</div>
	)
}

export default ProductItem
