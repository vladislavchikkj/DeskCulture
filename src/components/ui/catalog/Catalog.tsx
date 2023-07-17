import { FC, useEffect, useState } from 'react'

import { TypePaginationProducts } from '@/types/product.interface'

import Button from '../common/buttons/Button'
import Heading from '../common/heading/Heading'
import Loader from '../common/loader/Loader'

import catalogStyle from './catalog.module.scss'
import ProductItem from './product-item/ProductItem'
import SortDropdown from './product-item/sortDropdown/SortDropdown'
import { ProductService } from '@/services/product/product.service'
import { EnumProductSort } from '@/services/product/product.types'

interface ICatalog {
	data: TypePaginationProducts
	title?: string
}

const Catalog: FC<ICatalog> = ({ data, title }) => {
	const [page, setPage] = useState(1)
	const [sortType, setSortType] = useState<EnumProductSort>(
		EnumProductSort.NEWEST
	)
	const [products, setProducts] = useState(data.products)
	const [isLoading, setIsLoading] = useState(false)
	const [allProductsLoaded, setAllProductsLoaded] = useState(false)
	useEffect(() => {
		// Обновление списка продуктов при изменении типа сортировки
		const updateProducts = async () => {
			setIsLoading(true)
			try {
				const response = await ProductService.getAll({
					page: 1,
					perPage: 6,
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

		updateProducts()
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
				// Удаление дубликатов из новых продуктов
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
		<section className={`${catalogStyle.catalog} container-f`}>
			<div>
				{title && <Heading variant='catalog'>{title}</Heading>}
				<div className={catalogStyle.btnWrapper}>
					<Button data-hover='Categories' variant='grey'>
						Categories
					</Button>
					<Button data-hover='Setup' variant='grey'>
						Setup
					</Button>
					<Button data-hover='Products' variant='black'>
						Products
					</Button>
				</div>
			</div>

			<SortDropdown sortType={sortType} setSortType={setSortType} />
			{isLoading && <Loader />}
			{products.length ? (
				<>
					<div className={catalogStyle.items}>
						{products.map(product => (
							<ProductItem key={product.id} product={product} />
						))}
					</div>
					{!allProductsLoaded ? (
						<div className='flex justify-end pt-12 pb-10'>
							<Button
								data-hover='See more'
								variant='black'
								onClick={loadMoreProducts}
								disabled={isLoading}
							>
								{isLoading ? 'Loading...' : 'See more'}
							</Button>
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
		</section>
	)
}

export default Catalog
