import { GetStaticProps, NextPage } from 'next'

import { TypePaginationProducts } from '@/types/product.interface'

import Home from '@/screens/home/Home'
import { Productservice } from '@/services/product/product.service'

const HomePage: NextPage<TypePaginationProducts> = ({ length, products }) => {
	return <Home products={products} length={length} />
}

export const getStaticProps: GetStaticProps<
	TypePaginationProducts
> = async () => {
	const { data } = await Productservice.getAll({
		page: 1,
		perPage: 4
	})
	return {
		props: data
	}
}

export default HomePage
