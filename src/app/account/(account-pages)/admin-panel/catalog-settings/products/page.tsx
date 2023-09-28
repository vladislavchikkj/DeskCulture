import { ProductService } from '@/services/product/product.service'
import Account from '../../../Account'
import CatalogSettings from '../CatalogSettings'
import ProductsSettings from './Products'

async function getStaticProps() {
	const products = await ProductService.getAll()

	const data = {
		products: products.products
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
					<ProductsSettings products={data.props.products} />
				</CatalogSettings>
			</Account>
		</div>
	)
}
