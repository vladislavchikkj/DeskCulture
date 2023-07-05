import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'

import { TypePaginationProducts } from '@/types/product.interface'

import Button from '../button/Button'
import Heading from '../heading/Heading'
import Loader from '../loader/Loader'

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
	const { data: response, isLoading } = useQuery(
		['products', sortType, page],
		() =>
			ProductService.getAll({
				page,
				perPage: 4,
				sort: sortType
			}),
		{
			initialData: data,
			keepPreviousData: true
		}
	)
	if (isLoading) return <Loader />
	return (
		<section className={catalogStyle.catalog}>
			{title && <Heading variant='catalog'>{title}</Heading>}
			<SortDropdown sortType={sortType} setSortType={setSortType} />
			{response.products.length ? (
				<>
					<div className={catalogStyle.items}>
						{response.products.map(product => (
							<ProductItem key={product.id} product={product} />
						))}
					</div>
					<div className='flex justify-end pt-12 pb-10'>
						<Button
							data-hover='See more'
							variant='black'
							onClick={() => setPage(page + 1)}
						>
							See more
						</Button>
					</div>
				</>
			) : (
				<div>There are no products</div>
			)}
		</section>
	)
}

export default Catalog
