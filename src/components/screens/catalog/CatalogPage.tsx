import { FC } from 'react'
import Scrollbars from 'react-custom-scrollbars'

import Meta from '@/ui/Meta'
import Catalog from '@/ui/catalog/Catalog'
import Layout from '@/ui/layout/Layout'

import { TypePaginationProducts } from '@/types/product.interface'

const CatalogPage: FC<TypePaginationProducts> = ({ products, length }) => {
	return (
		<Scrollbars
			thumbSize={300}
			autoHide
			universal={true}
			style={{
				height: '100vh'
			}}
		>
			<Meta title='Catalog'>
				<Layout>
					<Catalog title='Catalog' data={{ products, length }} />
				</Layout>
			</Meta>
		</Scrollbars>
	)
}

export default CatalogPage