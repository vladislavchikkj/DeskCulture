'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FC, useEffect, useRef, useState } from 'react'

import ProductList from '@/ui/catalog/productsList/ProductList'
import Button from '@/ui/common/buttons/Button'

import { useProfile } from '@/hooks/useProfile'

import { IProduct } from '@/types/product.interface'

import { baseAnimation } from '@/components/animations/baseAnimation'
import {
	breadcrumbsAnimation,
	imageAnimation
} from '@/components/animations/productAnimation'
import { useLayout } from '@/components/context/LayoutContext'
import useCustomMediaQuery from '@/hooks/useCustomMediaQuery'
import FavoriteButton from '@/ui/catalog/product-item/favoriteButton/FavoriteButton'
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useCheckout } from '@/components/context/CheckoutContext'
import { ICartItem } from '@/types/cart.interface'
import AddToCartButton from '@/ui/catalog/product-item/addToCardButton/AddToCartButton'
import { useRouter } from 'next/navigation'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import Detail from './details/Detail'
import style from './product.module.scss'
import ProductReviews from './reviews/ProductReviews'

type props = {
	product: IProduct[]
}

const Products: FC<props> = ({ product }) => {
	const router = useRouter()
	const { updateLayout } = useLayout()
	useEffect(() => {
		updateLayout(false)
	}, [])

	const { profile } = useProfile()
	const [isVisible, setIsVisible] = useState(false)

	const device = useCustomMediaQuery()

	const sliderAnimation = {
		hidden: {
			height: 0
		},
		visible: (custom: number) => ({
			height: 'auto',
			transition: { duration: 0.8, delay: custom * 0.2 }
		})
	}
	const sliderItemsAnimation = {
		hidden: {
			height: 0
		},
		visible: (custom: number) => ({
			height:
				device === 'laptop' || device === 'tablet' || device === 'mobile_m'
					? '40vh'
					: '60vh',
			transition: { duration: 0.8, delay: custom * 0.2 }
		})
	}

	const toggleVisibility = () => {
		setIsVisible(!isVisible)
	}
	const [selectedImageIndex, setSelectedImageIndex] = useState(0)
	const swiperRef = useRef<SwiperCore>(null) // <-- Используйте useRef вместо useState

	const handleImageClick = (index: number) => {
		setSelectedImageIndex(index)
		if (swiperRef.current) {
			swiperRef?.current.slideTo(index)
		}
	}
	// @ts-ignore
	useEffect(() => {
		if (swiperRef.current) {
			swiperRef.current.on('slideChange', () => {
				if (swiperRef.current) {
					setSelectedImageIndex(swiperRef.current.activeIndex)
				}
			})
		}
		return () => {
			if (swiperRef.current) {
				swiperRef.current.off('slideChange')
			}
		}
	})

	// Здесь объединяются изображения товаров и все productType изображения
	const allImages = [
		...product[0].images,
		...(product[0].productType?.flatMap(variant => variant.images) || [])
	]
	const [color, setColor] = useState<undefined | string>(
		product[0].productType && product[0].productType.length > 0
			? product[0].productType[0].color
			: 'default'
	)
	const [type, setType] = useState<undefined | string>(
		product[0].productType && product[0].productType.length > 0
			? product[0].productType[0].type
			: 'default'
	)

	const { setItem } = useCheckout()

	const handleBuyNowClick = (setColor?: string, setType?: string) => {
		const itemToBuy: ICartItem = {
			id: product[0].id,
			product: product[0],
			quantity: 1,
			price: product[0].price,
			color: setColor || undefined,
			type: setType || undefined
		}
		localStorage.setItem('directBuy', JSON.stringify(itemToBuy))
		setItem(itemToBuy)
		router.push('/checkout')
	}

	return (
		<motion.div
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			className={`${style.wrapper} container-f`}
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
						<motion.div
							custom={2}
							variants={sliderItemsAnimation}
							className={style.sliderItemsWr}
						>
							<div className={style.sliderItems}>
								{allImages.map((image, index) => (
									<img
										key={index}
										className={`${style.image} ${
											selectedImageIndex === index ? style.selectedImage : ''
										}`}
										src={image}
										alt={product[0].name}
										onClick={() => handleImageClick(index)}
									/>
								))}
							</div>
						</motion.div>
						<div className={style.imgHeight}>
							<motion.div variants={sliderAnimation} className={style.imgWr}>
								<Swiper
									className='mySwiper'
									// @ts-ignore
									pagination={true}
									modules={[Pagination]}
									onSwiper={swiper => {
										// @ts-ignore
										swiperRef.current = swiper
									}}
								>
									{allImages.map((image, i) => (
										<SwiperSlide key={i}>
											<motion.img
												variants={imageAnimation}
												key={i}
												className={style.image}
												src={image}
												alt={product[0].name}
											/>
										</SwiperSlide>
									))}
								</Swiper>
							</motion.div>
						</div>
					</div>
				</div>
				<motion.div variants={breadcrumbsAnimation} className={style.info}>
					<div className={style.name}>{product[0].name}</div>
					<div className={style.price}>${product[0].price}</div>
					<div className={style.descr}>{product[0].info}</div>
					<div className={style.rating}>Rating: 5 star</div>
					<div className={style.variantSelect}>
						{product[0].productType &&
							product[0].productType.length > 0 &&
							product[0].productType[0].color && (
								<div className={style.color}>Color</div>
							)}
						<div className={style.variantWrapper}>
							{product[0].productType &&
								product[0].productType.length > 0 &&
								product[0].productType[0].color &&
								product[0].productType.map((variant, index) => (
									<button
										className={`${style.variant} ${
											color === variant.color ? style.activeVariant : ''
										}`}
										onClick={() => setColor(variant.color)}
										key={index}
									>
										{variant.color}
									</button>
								))}
						</div>
					</div>
					<div className={style.variantSelect}>
						{product[0].productType &&
							product[0].productType.length > 0 &&
							product[0].productType[0].type && (
								<div className={style.color}>Types</div>
							)}
						<div className={style.variantWrapper}>
							{product[0].productType &&
								product[0].productType.length > 0 &&
								product[0].productType[0].type &&
								product[0].productType.map((variant, index) => (
									<button
										className={`${style.variant} ${
											type === variant.type ? style.activeVariant : ''
										}`}
										onClick={() => setType(variant.type)}
										key={index}
									>
										{variant.type}
									</button>
								))}
						</div>
					</div>

					<div className={style.buttons}>
						<div className={style.addToCart}>
							<AddToCartButton product={product[0]} color={color} type={type}>
								Add to cart
							</AddToCartButton>
						</div>
						{!!profile && (
							<div className={style.favoriteButton}>
								<FavoriteButton productId={product[0].id} variant='default' />
							</div>
						)}
					</div>
					<button
						onClick={() => handleBuyNowClick(color, type)}
						className={style.btnForm}
					>
						Buy now
					</button>
					<div className={style.details}>
						<Detail
							title={'Product Details'}
							content={product[0].description.split('\r\n').map((item, key) => {
								return (
									<span key={key}>
										{item}
										<br />
									</span>
								)
							})}
						/>
						<Detail
							title={'Shipping Details'}
							content={
								'Arrival within 10-15 business days. Tracking details will be included in the shipping confirmation e-mail.'
							}
						/>
						<Detail
							title={'Payment'}
							content={
								'We accept all major credit cards and debit cards, Stripe and GPay.'
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
