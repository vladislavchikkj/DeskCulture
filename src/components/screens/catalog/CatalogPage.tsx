import { FC } from 'react'

import Meta from '@/ui/Meta'
import Catalog from '@/ui/catalog/Catalog'
import Layout from '@/ui/layout/Layout'

import { TypePaginationСatalog } from '@/types/product.interface'

const CatalogPage: FC<TypePaginationСatalog> = ({
	products,
	categories,
	setups
}) => {
	return (
		<Meta title='Catalog'>
			<Layout>
				<Catalog title='Catalog' data={{ products, categories, setups }} />
			</Layout>
		</Meta>
	)
}

export default CatalogPage
