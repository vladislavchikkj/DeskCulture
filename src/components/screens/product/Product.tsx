import dynamic from 'next/dynamic'
import Link from 'next/link'
import { FC, useState } from 'react'

import AddToCartButton from '@/ui/catalog/product-item/addToCardButton/AddToCartButton'
import ProductList from '@/ui/catalog/productsList/ProductList'
import Button from '@/ui/common/buttons/Button'

import { useProfile } from '@/hooks/useProfile'

import { IProduct } from '@/types/product.interface'

import style from './product.module.scss'

type props = {
	product: IProduct[]
}

const Products: FC<props> = ({ product }) => {
	const { profile } = useProfile()
	const [productArr] = product
	const DynamicFavoriteButton = dynamic(
		() => import('@/ui/catalog/product-item/favoriteButton/FavoriteButton'),
		{
			ssr: false
		}
	)
	const [selectedImageIndex, setSelectedImageIndex] = useState(0) // Step 1: State variable for selected image index

	const handleImageClick = (index: number) => {
		setSelectedImageIndex(index)
	}
	return (
		<div className='container-f'>
			<div className={style.content}>
				<div className={style.imagesWraper}>
					<div className={style.breadcrumbs}>
						<span>
							<Link href={'/'}>Home</Link>
						</span>
						<div className={style.slesh}>/</div>
						<span>
							<Link href={'/catalog'}>Categories</Link>
						</span>
						<div className={style.slesh}>/</div>
						<span>
							<Link href={`/category/${productArr.category.slug}`}>
								{productArr.category.name}
							</Link>
						</span>
						<div className={style.slesh}>/</div>
						<span className={style.select}>{productArr.name}</span>
					</div>
					<div className={style.slider}>
						<img
							className={style.image}
							src={productArr.images[selectedImageIndex]} // Step 3: Use selected image index to update src
							alt={productArr.name}
						/>
						<div className={style.sliderItems}>
							{productArr.images.map((image, index) => (
								<img
									key={index}
									className={`${style.image} ${
										selectedImageIndex === index ? style.selectedImage : ''
									}`}
									src={image}
									alt={productArr.name}
									onClick={() => handleImageClick(index)} // Step 2: Add click handler
								/>
							))}
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
						{!!profile && (
							<div className={style.favoriteButton}>
								<DynamicFavoriteButton
									productId={productArr.id}
									variant='default'
								/>
							</div>
						)}
					</div>
					<div className={style.details}>
						<div className={style.detail}>
							<div>Product Details</div>
							<div>+</div>
						</div>
						<div className={style.detail}>
							<div>Shipping Details</div>
							<div>+</div>
						</div>
						<div className={style.detail}>
							<div>Payment</div>
							<div>+</div>
						</div>
						<div className={style.detail}>
							<div>Gifting</div>
							<div>+</div>
						</div>
						<div className={style.detail}>
							<div>Next Day Pick Up</div>
							<div>+</div>
						</div>
					</div>
				</div>
			</div>
			<div className={style.intrestedWrap}>
				<div className={style.intrested}>
					<div className={style.btnWrapper}>
						<span className={style.numdot}>01</span>
						<Button data-hover='Learn More' variant='grey'>
							Learn More
						</Button>
					</div>
					<div className={style.title}>
						YOU MAY ALSO BE <br /> INTERESTED IN:
					</div>
				</div>
				<ProductList
					initialProducts={product}
					DropdownOff={true}
					loadMoreBtnOff={true}
				/>
			</div>
		</div>
	)
}

export default Products
