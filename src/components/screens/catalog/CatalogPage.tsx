import { FC } from 'react'

import Meta from '@/ui/Meta'
import Catalog from '@/ui/catalog/Catalog'

import { TypePaginationСatalog } from '@/types/product.interface'

const CatalogPage: FC<TypePaginationСatalog> = ({
	products,
	categories,
	setups
}) => {
	return (
		<Meta title='Catalog'>
			<Catalog title='Catalog' data={{ products, categories, setups }} />
		</Meta>
	)
}

export default CatalogPage
