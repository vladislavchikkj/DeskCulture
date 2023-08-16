import dynamic from 'next/dynamic'
import { FC } from 'react'

import AddToCartButton from '@/ui/catalog/product-item/addToCardButton/AddToCartButton'
import ProductList from '@/ui/catalog/productsList/ProductList'
import Button from '@/ui/common/buttons/Button'

import { IProduct } from '@/types/product.interface'

import style from './product.module.scss'

type props = {
	product: IProduct[]
}

const Products: FC<props> = ({ product }) => {
	const [productArr] = product
	const DynamicFavoriteButton = dynamic(
		() => import('@/ui/catalog/product-item/favoriteButton/FavoriteButton'),
		{
			ssr: false
		}
	)
	return (
		<div className='container-f'>
			<div className={style.content}>
				<div className={style.imagesWraper}>
					<div className={style.breadcrumbs}>
						Home / Categories / {productArr.category.name} / {productArr.name}
					</div>
					<div className={style.slider}>
						<img
							className={style.image}
							src={productArr.images[0]}
							alt={productArr.name}
						/>
						<div className={style.sliderItems}>
							<img
								className={style.image}
								src={productArr.images[0]}
								alt={productArr.name}
							/>
							<img
								className={style.image}
								src={productArr.images[0]}
								alt={productArr.name}
							/>
							<img
								className={style.image}
								src={productArr.images[0]}
								alt={productArr.name}
							/>
						</div>
					</div>
				</div>
				<div className={style.info}>
					<div className={style.name}>{productArr.name}</div>
					<div className={style.price}>${productArr.price}</div>
					<div className={style.descr}>{productArr.description}</div>
					<div className={style.rating}>Rating: 5 star</div>
					<div className={style.buttons}>
						<div className={style.addToCart}>
							<AddToCartButton product={productArr} />
						</div>
						<div className={style.favoriteButton}>
							<DynamicFavoriteButton productId={productArr.id} />
						</div>
					</div>
					<div className={style.details}>
						<div className={style.detail}>Product Details</div>
						<div className={style.detail}>Shipping Details</div>
						<div className={style.detail}>Payment</div>
						<div className={style.detail}>Gifting</div>
						<div className={style.detail}>Next Day Pick Up</div>
					</div>
				</div>
			</div>
			<div className={style.intrestedWrap}>
				<div className={style.intrested}>
					<div className={style.btnWrapper}>
						<span className={style.numdot}>01</span>
						<Button data-hover='ready setup' variant='grey'>
							ready setup
						</Button>
					</div>
					<div className={style.title}>
						YOU MAY ALSO BE <br /> INTERESTED IN:
					</div>
				</div>
				<ProductList initialProducts={product} DropdownOff={true} />
			</div>
		</div>
	)
}

export default Products
