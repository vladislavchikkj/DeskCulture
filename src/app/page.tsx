import Home from '@/app/home/Home'
import { CategoryService } from '@/services/category.service'
import { SetupsService } from '@/services/setups.service'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	description: 'DeskCulture',
	title: 'Home | DeskCulture'
}

export const revalidate = 60

async function getStaticProps() {
	const categories = await CategoryService.getAll()
	const setups = await SetupsService.getAll()

	const data = {
		categories: categories,
		setups: setups
	}
	return {
		props: data
	}
}

export default async function HomePage() {
	const data = await getStaticProps()
	return (
		<>
			<Home
				categories={data.props.categories}
				categoriesLength={data.props.categories.length}
				setups={data.props.setups}
				setupsLength={data.props.setups.length}
			/>
		</>
	)
}
