import { FC } from 'react'

import Meta from '@/ui/Meta'
import Catalog from '@/ui/catalog/Catalog'
import Layout from '@/ui/layout/Layout'

import { TypePaginationProducts } from '@/types/product.interface'

const Home: FC<TypePaginationProducts> = ({ products, length }) => {
	return (
		<Meta title='Home'>
			<Layout>
				<Catalog title='Catalog' data={{ products, length }} />
			</Layout>
		</Meta>
	)
}

export default Home
