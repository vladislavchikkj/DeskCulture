'use client'
import { useAuth } from '@/hooks/useAuth'
import { CategoryService } from '@/services/category.service'
import { ICategory } from '@/types/category.interface'
import { TypePaginationCategories } from '@/types/product.interface'
import Button from '@/ui/common/buttons/Button'
import Modal from '@/ui/common/modal/Modal'
import { FC, useState } from 'react'
import Del from '../icon/delete.svg'
import Edit from '../icon/edit.svg'
import LeaveCategoriesForm from './(leaveCategoriesForm)/LeaveCategoriesForm'
import UpdateCategoriesForm from './(updateCategoriesForm)/UpdateCategoriesForm'
import style from './categories.module.scss'

const CategoriesSettings: FC<TypePaginationCategories> = ({ categories }) => {
	const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
		null
	)
	const [isModalOpenCreate, setModalOpenCreate] = useState(false)
	const [isModalOpenUpdate, setModalOpenUpdate] = useState(false)
	const [categoryList, setCategoryList] = useState(categories)
	const { user } = useAuth()
	const handleCategoryUpdate = async () => {
		const updatedCategories = await CategoryService.getAll()
		setCategoryList(updatedCategories)
	}
	return (
		<div className={style.catalog}>
			{user && (
				<Modal
					isOpen={isModalOpenCreate}
					closeModal={() => setModalOpenCreate(false)}
				>
					<LeaveCategoriesForm categories={categories} />
				</Modal>
			)}
			{user && (
				<Modal
					isOpen={isModalOpenUpdate}
					closeModal={() => {
						setModalOpenUpdate(false)
						setSelectedCategory(null) // сбрасываем выбранный продукт при закрытии модального окна
					}}
				>
					<UpdateCategoriesForm
						categories={categories}
						category={selectedCategory}
						updateCategories={handleCategoryUpdate}
					/>
				</Modal>
			)}
			<div className={style.btn}>
				<Button
					onClick={() => setModalOpenCreate(true)}
					data-hover='+ add new categories'
					variant={'black'}
				>
					+ add new categories
				</Button>
			</div>
			<div className={style.columnsName}>
				<span>id</span>
				<span>name / slug</span>
				<span>description</span>
				<span>edit</span>
				<span>del</span>
			</div>
			{categories.map(category => (
				<div key={category.id} className={style.catalogInfo}>
					<div className={style.columnsItems}>
						<div className={style.id}>{category.id}</div>
						<div>
							<div>{category.name}</div>
							<div className={style.slug}>{category.slug}</div>
						</div>
						<div>{category.description.substring(0, 40)}...</div>
						<button
							className='cursor-pointer'
							onClick={() => {
								setModalOpenUpdate(true)
								setSelectedCategory(category)
							}}
						>
							<Edit />
						</button>
						<button
							className='cursor-pointer pt-1'
							onClick={async () => {
								if (
									window.confirm('Вы уверены, что хотите удалить этот товар?')
								) {
									await CategoryService.delete(category.id)
									setCategoryList(
										categoryList.filter(p => p.id !== category.id)
									)
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

export default CategoriesSettings
