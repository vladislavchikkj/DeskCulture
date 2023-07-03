import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { IProduct } from '@/types/product.interface'

import { convertPrice } from '@/utils/convertPrice'

import AddToCartButton from './AddToCartButton'
import ProductRating from './ProductRating'
import itemStyle from './product-item.module.scss'

const DynamicFavoriteButton = dynamic(() => import('./FavoriteButton'), {
	ssr: false
})

const ProductItem: FC<{ product: IProduct }> = ({ product }) => {
	return (
		<div className={itemStyle.item}>
			<div>
				<div>
					<DynamicFavoriteButton productId={product.id} />
					<AddToCartButton product={product} />
				</div>
				<Link href={`/product/${product.slug}`}>
					<Image
						width={440}
						height={120}
						src={product.images[0]}
						alt={product.name}
					></Image>
				</Link>
			</div>
			<Link href={`/category/${product.category.slug}`}>
				<h3>{product.name}</h3>
			</Link>

			<Link href={`/product/${product.slug}`}>{product.category.name}</Link>
			<ProductRating product={product} />
			<div>{convertPrice(product.price)}</div>
		</div>
	)
}

export default ProductItem
