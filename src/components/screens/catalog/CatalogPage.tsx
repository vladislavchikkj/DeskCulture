'use client'
import { FC } from 'react'

import Catalog from '@/ui/catalog/Catalog'

import { TypePaginationСatalog } from '@/types/product.interface'

const CatalogPage: FC<TypePaginationСatalog> = ({
	products,
	categories,
	setups
}) => {
	return <Catalog title='Catalog' data={{ products, categories, setups }} />
}

export default CatalogPage
