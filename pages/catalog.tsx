import { GetStaticProps, NextPage } from 'next'

import { TypePaginationProducts } from '@/types/product.interface'

import CatalogPage from '@/screens/catalog/CatalogPage'
import { ProductService } from '@/services/product/product.service'

const Catalog: NextPage<TypePaginationProducts> = ({ length, products }) => {
	return <CatalogPage products={products} length={length} />
}

export const getStaticProps: GetStaticProps<
	TypePaginationProducts
> = async () => {
	const data = await ProductService.getAll({
		page: 1,
		perPage: 6
	})
	return {
		props: data
	}
}

export default Catalog
