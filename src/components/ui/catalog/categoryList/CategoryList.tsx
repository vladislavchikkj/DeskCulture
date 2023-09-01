'use client'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import React, { useState } from 'react'

import Loader from '@/ui/common/loader/Loader'

import { ICategory } from '@/types/category.interface'

import setupStyle from '../catalogSetups.module.scss'

import { CategoryService } from '@/services/category.service'
import { ProductService } from '@/services/product/product.service'

// Подключите компонент лоадера

interface CategoryProps {
	categories: ICategory[]
}

const CategoryList: React.FC<CategoryProps> = ({ categories }) => {
	const [isLoading, setIsLoading] = useState(false) // Добавляем стейт для загрузки
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
		<div className={setupStyle.itemWrapper}>
			{isLoading ? ( // Если isLoading === true, показываем лоадер
				<Loader />
			) : (
				categories.map(category => (
					<div key={category.id} className={setupStyle.item}>
						<div className={setupStyle.imageWrapper}>
							<Link href={`/category/${category.slug}`}>
								<img
									src={category.image}
									alt={category.name}
									className={setupStyle.image}
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
		</div>
	)
}

export default CategoryList
