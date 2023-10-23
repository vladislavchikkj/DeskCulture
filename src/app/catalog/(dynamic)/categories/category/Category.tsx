'use client'
import { motion } from 'framer-motion'
import { FC, useEffect } from 'react'

import ProductList from '@/ui/catalog/productsList/ProductList'

import { ICategory } from '@/types/category.interface'
import { IProduct } from '@/types/product.interface'

import { useLayout } from '@/components/context/LayoutContext'
import useCustomMediaQuery from '@/hooks/useCustomMediaQuery'
import { ScrollParallax } from 'react-just-parallax'
import style from './category.module.scss'

type props = {
	products: IProduct[]
	category: ICategory
}

const Category: FC<props> = ({ products, category }) => {
	//решить проблему с дублирование
	const { updateLayout } = useLayout()
	useEffect(() => {
		updateLayout(false)
	}, [])
	const device = useCustomMediaQuery()

	if (device === null) {
		// Если тип устройства еще не определен, можно вернуть загрузчик или пустой div.
		return <div>Loading...</div>
	}
	const introAnimation = {
		hidden: {
			height: 0
		},
		visible: (custom: number) => ({
			height: device === 'mobile_m' ? '40vh' : '35vw',
			transition: { duration: 0.8, delay: custom * 0.2 }
		})
	}
	const imageAnimation = {
		hidden: {
			scale: 1.2
		},
		visible: (custom: number) => ({
			scale: 1,
			transition: { duration: 0.8, delay: custom * 0.2 }
		})
	}
	const prodAnimation = {
		hidden: {
			y: 300,
			opacity: 0
		},
		visible: (custom: number) => ({
			y: 0,
			opacity: 1,
			transition: { duration: 0.8, delay: custom * 0.2 }
		})
	}

	return (
		<motion.div
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			className={style.category}
		>
			<div className={style.introWrapper}>
				<ScrollParallax lerpEase={0.05} zIndex={9} strength={0.05}>
					<motion.div variants={introAnimation} className={style.intro}>
						<motion.img
							variants={imageAnimation}
							className={style.image}
							src={category.image}
							alt={category.name}
						/>
						<div className={`${style.name} container-f`}>{category.name}</div>
					</motion.div>
				</ScrollParallax>
			</div>
			<div className={style.allProd}>
				<ScrollParallax lerpEase={0.05} zIndex={10} strength={-0.15}>
					<motion.div
						custom={2}
						variants={prodAnimation}
						className={style.allProd}
					>
						<div className={`${style.title} container-f`}>All Products</div>
						<div className='container-f'>
							<ProductList
								initialProducts={products}
								slug={category.slug}
								DropdownOff={true}
								loadMoreBtnOff={true}
								needToUpdate={false}
							/>
						</div>
					</motion.div>
				</ScrollParallax>
			</div>
		</motion.div>
	)
}

export default Category
