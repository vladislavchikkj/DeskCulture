import { FC } from 'react'
import Scrollbars from 'react-custom-scrollbars'

import Meta from '@/ui/Meta'
import Catalog from '@/ui/catalog/Catalog'
import Layout from '@/ui/layout/Layout'

import { TypePaginationProducts } from '@/types/product.interface'

const Home: FC<TypePaginationProducts> = ({ products, length }) => {
	return (
		<Scrollbars
			thumbSize={300}
			autoHide
			universal={true}
			style={{
				height: '100vh',
				zIndex: 101
			}}
		>
			<Meta title='Home'>
				<Layout>
					<Catalog title='Catalog' data={{ products, length }} />
				</Layout>
			</Meta>
		</Scrollbars>
	)
}

export default Home
