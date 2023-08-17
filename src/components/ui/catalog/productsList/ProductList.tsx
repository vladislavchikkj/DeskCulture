import { FC, useEffect, useState } from 'react'

import Button from '@/ui/common/buttons/Button'
import Loader from '@/ui/common/loader/Loader'

import { TypePaginationСatalog } from '@/types/product.interface'

import catalogStyle from '../catalog.module.scss'
import ProductItem from '../product-item/ProductItem'
import SortDropdown from '../product-item/sortDropdown/SortDropdown'

import { ProductService } from '@/services/product/product.service'
import { EnumProductSort } from '@/services/product/product.types'

interface ProductListProps {
	initialProducts: TypePaginationСatalog['products']
	slug?: string // Add this line
	DropdownOff?: boolean
	loadMoreBtnOff?: boolean
}

const ProductList: FC<ProductListProps> = ({
	initialProducts,
	slug,
	DropdownOff,
	loadMoreBtnOff
}) => {
	const [page, setPage] = useState(1)
	const [sortType, setSortType] = useState<EnumProductSort>(
		EnumProductSort.NEWEST
	)
	const [products, setProducts] = useState(initialProducts)
	const [isLoading, setIsLoading] = useState(false)
	const [allProductsLoaded, setAllProductsLoaded] = useState(false)

	useEffect(() => {
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

		// updateProducts() // edit
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
		<div>
			{!DropdownOff && (
				<SortDropdown sortType={sortType} setSortType={setSortType} />
			)}
			{isLoading ? ( // Если isLoading === true, показываем лоадер
				<Loader />
			) : products.length > 0 ? ( // Если isLoading === false и есть продукты, показываем продукты
				<>
					<div className={catalogStyle.items}>
						{products.map(product => (
							<ProductItem key={product.id} product={product} />
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
				// Если isLoading === false и нет продуктов, показываем сообщение об отсутствии продуктов
				<div>There are no products</div>
			)}
		</div>
	)
}

export default ProductList
