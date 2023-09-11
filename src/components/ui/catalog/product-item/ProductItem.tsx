import Link from 'next/link'
import { FC } from 'react'

import { IProduct } from '@/types/product.interface'

import { convertPrice } from '@/utils/convertPrice'

import AddToCartButton from './addToCardButton/AddToCartButton'
import FavoriteButton from './favoriteButton/FavoriteButton'
import style from './product-item.module.scss'
import ProductRating from './productRating/ProductRating'

const ProductItem: FC<{ product: IProduct; descr?: boolean }> = ({
	product,
	descr
}) => {
	return (
		<div className={style.item}>
			<div>
				<div className={style.imageBox}>
					<Link href={`/catalog/products/${product.slug}`}>
						<div className={style.imageWrapper}>
							<img
								className={style.image}
								src={product.images[0]}
								alt={product.name}
							/>
						</div>
					</Link>
				</div>
			</div>
			<div className={style.itemInfo}>
				<div className={style.nameWrapper}>
					<Link href={`/catalog/products/${product.slug}`}>
						<h3 className={style.itemTitle}>{product.name}</h3>
					</Link>
					<div className={style.btn}>
						<div className={style.favoriteButton}>
							<FavoriteButton variant='default' productId={product.id} />
							<AddToCartButton product={product}> </AddToCartButton>
						</div>
					</div>
				</div>
				{!descr && <div className={style.descr}>{product.description} ...</div>}

				<div className={style.infoWrapper}>
					<div className={style.priceText}>
						<div className='flex gap-2'>
							<div className={style.price}>{convertPrice(product.price)}</div>
							<Link
								className={style.itemSlug}
								href={`/catalog/categories/${product.category.slug}`}
							>
								{product.category.name}
							</Link>
						</div>
						<div className={style.available}>Available in 3 variants.</div>
					</div>
					<ProductRating product={product} />
				</div>
			</div>
		</div>
	)
}

export default ProductItem
