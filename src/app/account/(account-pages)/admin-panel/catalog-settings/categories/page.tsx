import { CategoryService } from '@/services/category.service'
import Account from '../../../Account'
import CatalogSettings from '../CatalogSettings'
import CategoriesSettings from './Categories'

async function getStaticProps() {
	const categories = await CategoryService.getAll()

	const data = {
		categories: categories
	}
	return {
		props: data
	}
}

export default async function CategoriesSettingsPage() {
	const data = await getStaticProps()
	return (
		<div>
			<Account>
				{/* <ProductsSettings products={data.props.products} /> */}
				<h1 className='title'>Categories settings</h1>
				<CatalogSettings>
					<CategoriesSettings categories={data.props.categories} />
				</CatalogSettings>
			</Account>
		</div>
	)
}
