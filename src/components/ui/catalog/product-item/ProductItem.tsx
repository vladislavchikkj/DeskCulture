import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

import { IProduct } from '@/types/product.interface'

import { convertPrice } from '@/utils/convertPrice'

import useCustomMediaQuery from '@/hooks/useCustomMediaQuery'
import AddToCartButton from './addToCardButton/AddToCartButton'
import FavoriteButton from './favoriteButton/FavoriteButton'
import style from './product-item.module.scss'
import ProductRating from './productRating/ProductRating'

const ProductItem: FC<{ product: IProduct; descr?: boolean }> = ({
	product,
	descr
}) => {
	const device = useCustomMediaQuery()
	const [isVisible, setIsVisible] = useState(true)

	useEffect(() => {
		switch (device) {
			case 'mobile_m':
				setIsVisible(false)
				break
			case 'mobile_s':
				setIsVisible(false)
				break
			default:
				setIsVisible(true)
		}
	}, [device])
	return (
		<div className={style.item}>
			<div>
				<div className={style.imageBox}>
					{!isVisible && (
						<div className={style.btnMobile}>
							<div className={style.favoriteButton}>
								<FavoriteButton variant='default' productId={product.id} />
								<AddToCartButton product={product}> </AddToCartButton>
							</div>
						</div>
					)}
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
					{isVisible && (
						<div className={style.btn}>
							<div className={style.favoriteButton}>
								<FavoriteButton variant='default' productId={product.id} />
								<AddToCartButton product={product}> </AddToCartButton>
							</div>
						</div>
					)}
				</div>
				{!descr && <div className={style.descr}>{product.info} ...</div>}

				<div className={style.infoWrapper}>
					<div className={style.priceText}>
						<div className={style.priceTextWrapper}>
							<div className={style.price}>
								{convertPrice(product.price)} USD
							</div>
							<Link
								className={style.itemSlug}
								href={`/catalog/categories/${product.category.slug}`}
							>
								{product.category.name}
							</Link>
						</div>
					</div>
					<div className={style.rating}>
						<ProductRating product={product} />
					</div>
				</div>
				<div className={style.available}>
					Only {product.remains} left on stock.
				</div>
			</div>
		</div>
	)
}

export default ProductItem
