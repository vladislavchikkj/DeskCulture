'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

import AddToCartButton from '@/ui/catalog/product-item/addToCardButton/AddToCartButton'
import ProductList from '@/ui/catalog/productsList/ProductList'
import Button from '@/ui/common/buttons/Button'

import { useProfile } from '@/hooks/useProfile'

import { IProduct } from '@/types/product.interface'

import { baseAnimation } from '@/components/animations/baseAnimation'
import {
	breadcrumbsAnimation,
	imageAnimation,
	sliderAnimation,
	sliderItemsAnimation
} from '@/components/animations/productAnimation'
import { useLayout } from '@/components/context/LayoutContext'
import FavoriteButton from '@/ui/catalog/product-item/favoriteButton/FavoriteButton'
import Detail from './details/Detail'
import style from './product.module.scss'
import ProductReviews from './reviews/ProductReviews'

type props = {
	product: IProduct[]
}

const Products: FC<props> = ({ product }) => {
	//решить проблему с дублирование
	const { updateLayout } = useLayout()
	useEffect(() => {
		updateLayout(false)
	}, [])

	const { profile } = useProfile()
	const [isVisible, setIsVisible] = useState(false)

	const toggleVisibility = () => {
		setIsVisible(!isVisible)
	}
	const [selectedImageIndex, setSelectedImageIndex] = useState(0) // Step 1: State variable for selected image index

	const handleImageClick = (index: number) => {
		setSelectedImageIndex(index)
	}

	return (
		<motion.div
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			className='container-f'
			variants={baseAnimation}
		>
			<div className={style.content}>
				<div className={style.imagesWraper}>
					<div className={style.breadcrumbsWr}>
						<motion.div
							variants={breadcrumbsAnimation}
							className={style.breadcrumbs}
						>
							<Link href={'/'}>
								<span>Home</span>
							</Link>
							<div className={style.slesh}>/</div>
							<Link href={'/catalog'}>
								<span>Categories</span>
							</Link>
							<div className={style.slesh}>/</div>
							<Link href={`/catalog/categories/${product[0].category.slug}`}>
								<span>{product[0].category.name}</span>
							</Link>
							<div className={style.slesh}>/</div>
							<span className={style.select}>{product[0].name}</span>
						</motion.div>
					</div>
					<div className={style.slider}>
						<div className={style.sliderItemsWr}>
							<motion.div
								custom={2}
								variants={sliderItemsAnimation}
								className='overflow-scroll'
							>
								<div className={style.sliderItems}>
									{product[0].images.map((image, index) => (
										<img
											key={index}
											className={`${style.image} ${
												selectedImageIndex === index ? style.selectedImage : ''
											}`}
											src={image}
											alt={product[0].name}
											onClick={() => handleImageClick(index)} // Step 2: Add click handler
										/>
									))}
								</div>
							</motion.div>
						</div>
						<div className={style.imgHeight}>
							<motion.div variants={sliderAnimation} className={style.imgWr}>
								<motion.img
									variants={imageAnimation}
									className={style.image}
									src={product[0].images[selectedImageIndex]} // Step 3: Use selected image index to update src
									alt={product[0].name}
								/>
							</motion.div>
						</div>
					</div>
				</div>
				<motion.div variants={breadcrumbsAnimation} className={style.info}>
					<div className={style.name}>{product[0].name}</div>
					<div className={style.price}>${product[0].price}</div>
					<div className={style.descr}>{product[0].description}</div>
					<div className={style.rating}>Rating: 5 star</div>
					<div className={style.buttons}>
						<div className={style.addToCart}>
							<AddToCartButton product={product[0]}>Buy now</AddToCartButton>
						</div>
						{!!profile && (
							<div className={style.favoriteButton}>
								<FavoriteButton productId={product[0].id} variant='default' />
							</div>
						)}
					</div>
					<div className={style.details}>
						<Detail
							title={'Product Details'}
							content={product[0].description}
						/>
						<Detail
							title={'Shipping Details'}
							content={
								'Arrival within 3-5 business days. Tracking details will be included in the shipping confirmation e-mail.'
							}
						/>
						<Detail
							title={'Payment'}
							content={
								'We accept all major credit cards and debit cards, Paypal and Apple Pay.'
							}
						/>
						<Detail
							title={'Gifting'}
							content={
								'Each DeckCulture purchase is accompanied by a coupon for a 10 percent discount on the next purchase.'
							}
						/>
						<Detail
							title={'Next Day Pick Up'}
							content={
								'Next day delivery is only available at our local DeckCulture store'
							}
						/>
					</div>
				</motion.div>
			</div>
			<div className={style.intrestedWrap}>
				<div className={style.intrested}>
					<div className={style.btnWrapper}>
						<span className={style.numdot}>01</span>
						<Button data-hover='Reviews' variant='grey'>
							Reviews
						</Button>
					</div>
					<div className={style.title}>Reviews</div>
				</div>
				<ProductReviews
					reviews={product[0].reviews}
					productId={product[0].id}
				/>
			</div>
			<div className={style.intrestedWrap}>
				<div className={style.intrested}>
					<div className={style.btnWrapper}>
						<span className={style.numdot}>02</span>
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
		</motion.div>
	)
}

export default Products
