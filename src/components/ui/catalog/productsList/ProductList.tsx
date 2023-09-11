'use client'
import { FC, useEffect, useState } from 'react'

import Button from '@/ui/common/buttons/Button'

import { TypePaginationСatalog } from '@/types/product.interface'

import catalogStyle from '../catalog.module.scss'

import { ProductService } from '@/services/product/product.service'
import { EnumProductSort } from '@/services/product/product.types'
import Loader from '@/ui/common/loader/Loader'
import { motion } from 'framer-motion'
import ProductItem from '../product-item/ProductItem'
import SortDropdown from '../product-item/sortDropdown/SortDropdown'
import { baseAnimation } from '@/components/animations/baseAnimation'

interface ProductListProps {
	initialProducts: TypePaginationСatalog['products']
	slug?: string // Add this line
	DropdownOff?: boolean
	loadMoreBtnOff?: boolean
	needToUpdate?: boolean
	descr?: boolean
}

const ProductList: FC<ProductListProps> = ({
	initialProducts,
	slug,
	DropdownOff,
	loadMoreBtnOff,
	needToUpdate = true,
	descr
}) => {
	const [page, setPage] = useState(1)
	const [sortType, setSortType] = useState<EnumProductSort>(
		EnumProductSort.NEWEST
	)
	const [products, setProducts] = useState(initialProducts.slice(0, 6))
	const [isLoading, setIsLoading] = useState(false)
	const [allProductsLoaded, setAllProductsLoaded] = useState(false)
	useEffect(() => {
		const updateProducts = async () => {
			setIsLoading(true)
			try {
				const response = await ProductService.getAll({
					page: 1,
					perPage: 8,
					sort: sortType
				})
				setProducts(response.products)
				setPage(1)
				setAllProductsLoaded(false)
			} catch (error) {
				console.error('Error updating products:', error)
			} finally {
				setIsLoading(false)
			}
		}

		if (needToUpdate) {
			updateProducts() // edit
		}
	}, [sortType])
	const loadMoreProducts = async () => {
		setIsLoading(true)
		try {
			const response = await ProductService.getAll({
				page: page + 1,
				perPage: 6,
				sort: sortType
			})
			const newProducts = response.products
			if (newProducts.length === 0) {
				setAllProductsLoaded(true)
			} else {
				const uniqueNewProducts = newProducts.filter(
					newProduct => !products.some(product => product.id === newProduct.id)
				)
				setProducts(prevProducts => [...prevProducts, ...uniqueNewProducts])
				setPage(prevPage => prevPage + 1)
			}
		} catch (error) {
			console.error('Error loading more products:', error)
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<motion.div
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			variants={baseAnimation}
		>
			{!DropdownOff && (
				<SortDropdown sortType={sortType} setSortType={setSortType} />
			)}
			{products.length > 0 ? (
				<>
					<div className={catalogStyle.items}>
						{isLoading && <Loader />}
						{products.map(product => (
							<ProductItem key={product.id} product={product} descr={descr} />
						))}
					</div>
					{!allProductsLoaded ? (
						<div className='flex justify-end pt-12 pb-10'>
							{!loadMoreBtnOff && (
								<Button
									data-hover='See more'
									variant='black'
									onClick={loadMoreProducts}
									disabled={isLoading}
								>
									{isLoading ? 'Loading...' : 'See more'}
								</Button>
							)}
						</div>
					) : (
						<div className='flex justify-end pt-12 pb-10'>
							<span>No more products.</span>
						</div>
					)}
				</>
			) : (
				<div>There are no products</div>
			)}
		</motion.div>
	)
}

export default ProductList
