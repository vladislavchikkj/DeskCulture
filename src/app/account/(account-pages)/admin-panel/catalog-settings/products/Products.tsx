'use client'
import { useAuth } from '@/hooks/useAuth'
import { ProductService } from '@/services/product/product.service'
import { IProduct, TypeCombinedPagination } from '@/types/product.interface'
import Button from '@/ui/common/buttons/Button'
import Modal from '@/ui/common/modal/Modal'
import { FC, useState } from 'react'
import Del from '../icon/delete.svg'
import Edit from '../icon/edit.svg'
import LeaveProductForm from './(leaveProductForm)/LeaveProductForm'
import UpdateProductForm from './(updateProductForm)/UpdateProductForm'
import style from './products.module.scss'

const sortableKeys = ['id', 'name', 'slug', 'price', 'createdAt'] // array of keys that can be sorted

const ProductsSettings: FC<TypeCombinedPagination> = ({
	categories,
	setups,
	products
}) => {
	const [sortConfig, setSortConfig] = useState<{
		key: keyof IProduct
		direction: 'ascending' | 'descending'
	} | null>(null)

	const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)
	const [isModalOpenCreate, setModalOpenCreate] = useState(false)
	const [isModalOpenUpdate, setModalOpenUpdate] = useState(false)
	const [productList, setProductList] = useState(products)
	const { user } = useAuth()
	const updateProducts = async () => {
		// Здесь мы будем заново запросить список продуктов с сервера
		const newProducts = await ProductService.getAll()
		// Не забудьте обработать ошибки и предусмотреть заглушку для ProductService в случае его отсутствия
		setProductList(newProducts.products)
	}
	const handleSort = (key: keyof IProduct) => {
		if (!sortableKeys.includes(key)) return // check if the key is in the sortableKeys array

		setSortConfig(state => {
			if (state && state.key === key) {
				// переключает сортировку на противоположную при повторном клике
				return {
					key,
					direction:
						state.direction === 'ascending' ? 'descending' : 'ascending'
				}
			}
			return { key, direction: 'ascending' }
		})
	}
	let sortedProducts = [...productList]
	if (sortConfig) {
		const { key, direction } = sortConfig
		if (sortableKeys.includes(key)) {
			sortedProducts.sort((a: IProduct, b: IProduct) => {
				if ((a as any)[key] < (b as any)[key]) {
					return direction === 'ascending' ? -1 : 1
				}
				if ((a as any)[key] > (b as any)[key]) {
					return direction == 'ascending' ? 1 : -1
				}
				return 0
			})
		}
	}
	return (
		<div className={style.catalog}>
			{user && (
				<Modal
					isOpen={isModalOpenCreate}
					closeModal={() => setModalOpenCreate(false)}
				>
					<LeaveProductForm
						categories={categories}
						setups={setups}
						products={products}
						updateProducts={updateProducts}
					/>
				</Modal>
			)}
			{user && (
				<Modal
					isOpen={isModalOpenUpdate}
					closeModal={() => {
						setModalOpenUpdate(false)
						setSelectedProduct(null) // сбрасываем выбранный продукт при закрытии модального окна
					}}
				>
					<UpdateProductForm
						categories={categories}
						setups={setups}
						products={products}
						product={selectedProduct || undefined}
						updateProducts={updateProducts}
					/>
				</Modal>
			)}
			<div className={style.btn}>
				<Button
					onClick={() => setModalOpenCreate(true)}
					data-hover='+ add new products'
					variant={'black'}
				>
					+ add new products
				</Button>
			</div>
			<div className={style.columnsName}>
				<span onClick={() => handleSort('id')}>id</span>
				<span onClick={() => handleSort('name')}>name / slug</span>
				<span onClick={() => handleSort('price')}>price</span>
				<span onClick={() => handleSort('createdAt')}>data</span>
				<span>category</span>
				<span>edit</span>
				<span>del</span>
			</div>
			{sortedProducts.map(product => (
				<div key={product.id} className={style.catalogInfo}>
					<div className={style.columnsItems}>
						<div className={style.id}>{product.id}</div>
						<div>
							<div>{product.name}</div>
							<div className={style.slug}>{product.slug}</div>
						</div>
						<div className={style.price}>{product.price}</div>
						<div className={style.data}>
							{new Intl.DateTimeFormat('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							}).format(new Date(product.createdAt))}
						</div>
						<div>{product.category?.name}</div>
						<button
							className='cursor-pointer'
							onClick={() => {
								setModalOpenUpdate(true)
								setSelectedProduct(product)
							}}
						>
							<div>
								<Edit />
							</div>
						</button>
						<button
							className='cursor-pointer pt-1'
							onClick={async () => {
								if (
									window.confirm('Вы уверены, что хотите удалить этот товар?')
								) {
									await ProductService.delete(product.id)
									setProductList(productList.filter(p => p.id !== product.id))
								}
							}}
						>
							<div>
								<Del />
							</div>
						</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default ProductsSettings
