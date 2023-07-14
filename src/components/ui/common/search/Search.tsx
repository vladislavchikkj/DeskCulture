import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { ProductService } from '@/services/product/product.service'

const Search: FC = () => {
	const { query } = useRouter()

	const { data } = useQuery(['search products', query.term], () =>
		ProductService.getAll({
			searchTerm: query.term as string
		})
	)
	return (
		<>
			<div></div>
		</>
	)
}

export default Search
