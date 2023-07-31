import { GetStaticProps, NextPage } from 'next'

import { ICategory } from '@/types/category.interface'
import { TypeCombinedPagination } from '@/types/product.interface'

import Home from '@/screens/home/Home'
import { CategoryService } from '@/services/category.service'

const HomePage: NextPage<TypeCombinedPagination> = props => {
	return (
		<Home
			categories={props.categories}
			categoriesLength={length}
			setups={props.setups}
			setupsLength={length}
		/>
	)
}

export const getStaticProps: GetStaticProps<{
	categories: ICategory[]
	// setups: ISetups[]
}> = async () => {
	const categories = await CategoryService.getAll()
	// const setups = await SetupsService.getAll()

	const obj = {
		categories: categories
		// setups: setups
	}
	return {
		props: obj
	}
}

export default HomePage
