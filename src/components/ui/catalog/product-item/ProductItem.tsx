import dynamic from 'next/dynamic'
import Link from 'next/link'
import { FC } from 'react'

import { IProduct } from '@/types/product.interface'

import { convertPrice } from '@/utils/convertPrice'

import AddToCartButton from './addToCardButton/AddToCartButton'
import itemStyle from './product-item.module.scss'
import ProductRating from './productRating/ProductRating'

const DynamicFavoriteButton = dynamic(
	() => import('./favoriteButton/FavoriteButton'),
	{
		ssr: false
	}
)

const ProductItem: FC<{ product: IProduct }> = ({ product }) => {
	return (
		<div className={itemStyle.item}>
			<div>
				<div className={itemStyle.imageBox}>
					<div className={itemStyle.favoriteButton}>
						<DynamicFavoriteButton productId={product.id} />
					</div>
					<Link href={`/products/${product.slug}`}>
						<div className={itemStyle.imageWrapper}>
							<img
								className={itemStyle.image}
								src={product.images[0]}
								alt={product.name}
							/>
						</div>
					</Link>
				</div>
			</div>
			<div className={itemStyle.itemInfo}>
				<Link href={`/products/${product.slug}`}>
					<h3 className={itemStyle.itemTitle}>{product.name}</h3>
				</Link>

				<Link
					className={itemStyle.itemSlug}
					href={`/category/${product.category.slug}`}
				>
					{product.category.name}
				</Link>
				<ProductRating product={product} />
				<div className={itemStyle.priceText}>
					Price:
					<div className={itemStyle.price}>{convertPrice(product.price)}</div>
				</div>
				<div className={itemStyle.addToCart}>
					<AddToCartButton product={product} />
				</div>
			</div>
		</div>
	)
}

export default ProductItem
