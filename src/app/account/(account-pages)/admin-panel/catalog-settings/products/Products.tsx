'use client'
import { useAuth } from '@/hooks/useAuth'
import { TypePaginationProducts } from '@/types/product.interface'
import Button from '@/ui/common/buttons/Button'
import Modal from '@/ui/common/modal/Modal'
import { FC, useState } from 'react'
import Edit from '../icon/edit.svg'
import style from './products.module.scss'

const ProductsSettings: FC<TypePaginationProducts> = ({ products }) => {
	const [isModalOpen, setModalOpen] = useState(false)
	const { user } = useAuth()
	return (
		<div className={style.catalog}>
			{user && (
				<Modal isOpen={isModalOpen} closeModal={() => setModalOpen(false)}>
					Some text
				</Modal>
			)}
			<div className={style.btn}>
				<Button
					onClick={() => setModalOpen(true)}
					data-hover='+ add new products'
					variant={'black'}
				>
					+ add new products
				</Button>
			</div>
			<div className={style.columnsName}>
				<span>id</span>
				<span>name / slug</span>
				<span>price</span>
				<span>data</span>
				<span>category</span>
				<span>edit</span>
			</div>
			{products.map(product => (
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
						<div>{product.category.name}</div>
						<button className='cursor-pointer'>
							<Edit />
						</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default ProductsSettings
