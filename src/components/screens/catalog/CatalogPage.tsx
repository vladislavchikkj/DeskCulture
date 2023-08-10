import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { FC } from 'react'

import Meta from '@/ui/Meta'
import Catalog from '@/ui/catalog/Catalog'
import Layout from '@/ui/layout/Layout'
import Footer from '@/ui/layout/footer/Footer'

import { TypePaginationСatalog } from '@/types/product.interface'

const CatalogPage: FC<TypePaginationСatalog> = ({
	products,
	categories,
	setups
}) => {
	return (
		<Meta title='Catalog'>
			<Layout>
				<Parallax pages={2.5} style={{ top: '0', left: '0' }}>
					<ParallaxLayer offset={0} speed={0.2}>
						<Catalog title='Catalog' data={{ products, categories, setups }} />
					</ParallaxLayer>
					<Footer />
				</Parallax>
			</Layout>
		</Meta>
	)
}

export default CatalogPage
