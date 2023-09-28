'use client'
import { TypePaginationCategories } from '@/types/product.interface'
import Button from '@/ui/common/buttons/Button'
import { FC } from 'react'
import Edit from '../icon/edit.svg'
import style from './categories.module.scss'

const CategoriesSettings: FC<TypePaginationCategories> = ({ categories }) => {
	return (
		<div className={style.catalog}>
			<div className={style.btn}>
				<Button data-hover='+ add new categories' variant={'black'}>
					+ add new categories
				</Button>
			</div>
			<div className={style.columnsName}>
				<span>id</span>
				<span>name / slug</span>
				<span>description</span>
				<span>edit</span>
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
						<button className='cursor-pointer'>
							<Edit />
						</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default CategoriesSettings
