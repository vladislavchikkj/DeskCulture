import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { FC } from 'react'

import Meta from '@/ui/Meta'
import Catalog from '@/ui/catalog/Catalog'
import Layout from '@/ui/layout/Layout'

import { TypePaginationProducts } from '@/types/product.interface'

const CatalogPage: FC<TypePaginationProducts> = ({ products, length }) => {
	return (
		<Meta title='Catalog'>
			<Layout>
				<Parallax pages={1.9} style={{ top: '0', left: '0' }}>
					<ParallaxLayer offset={0} speed={0.2}>
						<Catalog title='Catalog' data={{ products, length }} />
					</ParallaxLayer>
				</Parallax>
			</Layout>
		</Meta>
	)
}

export default CatalogPage
