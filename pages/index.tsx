import { GetStaticProps, NextPage } from 'next'

import { ICategory } from '@/types/category.interface'

import Home from '@/screens/home/Home'
import { CategoryService } from '@/services/category.service'

const HomePage: NextPage<{ categories: ICategory[] }> = props => {
	return <Home products={props.categories} length={length} />
}

export const getStaticProps: GetStaticProps<{
	categories: ICategory[]
	// setups: ISetups[]
}> = async () => {
	const categories = await CategoryService.getAll()

	// const setups = await SetupService.getAll()
	const obj = {
		categories: categories
		// setups: setups
	}
	return {
		props: obj
	}
}

export default HomePage
