import { CategoryService } from '@/services/category.service'
import { ProductService } from '@/services/product/product.service'
import { SetupsService } from '@/services/setups.service'
import Account from '../../../Account'
import CatalogSettings from '../CatalogSettings'
import ProductsSettings from './Products'

async function getStaticProps() {
	const products = await ProductService.getAll()
	const categories = await CategoryService.getAll()
	const setups = await SetupsService.getAll()

	const data = {
		products: products.products,
		categories: categories,
		setups: setups
	}
	return {
		props: data
	}
}

export default async function ProductsSettingsPage() {
	const data = await getStaticProps()
	return (
		<div>
			<Account>
				<CatalogSettings>
					<h1 className='title'>Product settings</h1>
					<ProductsSettings
						products={data.props.products}
						categories={data.props.categories}
						setups={data.props.setups}
					/>
				</CatalogSettings>
			</Account>
		</div>
	)
}
