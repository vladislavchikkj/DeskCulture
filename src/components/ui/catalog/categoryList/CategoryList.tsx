'use client'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import React, { useState } from 'react'

import Loader from '@/ui/common/loader/Loader'

import { ICategory } from '@/types/category.interface'

import setupStyle from '../catalogSetups.module.scss'

import { baseAnimation } from '@/components/animations/baseAnimation'
import { shimmer, toBase64 } from '@/components/common'
import { CategoryService } from '@/services/category.service'
import { ProductService } from '@/services/product/product.service'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface CategoryProps {
	categories: ICategory[]
}

const CategoryList: React.FC<CategoryProps> = ({ categories }) => {
	const [isLoading, setIsLoading] = useState(false)
	const getStaticPaths: GetStaticPaths = async () => {
		const categories = await CategoryService.getAll()

		const paths = categories.map(category => {
			return {
				params: { slug: category.slug }
			}
		})
		return { paths, fallback: false }
	}

	const getStaticProps: GetStaticProps = async ({ params }) => {
		const { data: products } = await ProductService.getByCategory(
			params?.slug as string
		)
		const { data: category } = await CategoryService.getBySlug(
			params?.slug as string
		)
		return {
			props: {
				products,
				category
			}
		}
	}

	return (
		<motion.div
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			variants={baseAnimation}
			className={setupStyle.itemWrapper}
		>
			{isLoading ? (
				<Loader />
			) : (
				categories.map(category => (
					<div key={category.id} className={setupStyle.item}>
						<div className={setupStyle.imageWrapper}>
							<Link href={`/catalog/categories/${category.slug}`}>
								<Image
									width={1000}
									height={1000}
									src={category.image}
									alt={category.name}
									className={setupStyle.image}
									placeholder={`data:image/svg+xml;base64,${toBase64(
										shimmer(700, 475)
									)}`}
									style={{
										maxWidth: '100%',
										height: 'auto'
									}}
								/>
							</Link>
						</div>
						<div className={setupStyle.descr}>
							<h3>{category.name}</h3>
							<h4>{category.description}</h4>
						</div>
					</div>
				))
			)}
		</motion.div>
	)
}

export default CategoryList
