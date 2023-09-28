'use client'
import { TypePaginationSetup } from '@/types/product.interface'
import Button from '@/ui/common/buttons/Button'
import { FC } from 'react'
import Edit from '../icon/edit.svg'
import style from './setups.module.scss'

const SetupsSettings: FC<TypePaginationSetup> = ({ setups }) => {
	return (
		<div className={style.catalog}>
			<div className={style.btn}>
				<Button data-hover='+ add new setup' variant={'black'}>
					+ add new setup
				</Button>
			</div>
			<div className={style.columnsName}>
				<span>id</span>
				<span>name</span>
				<span>description</span>
				<span>edit</span>
			</div>
			{setups.map(setup => (
				<div key={setup.id} className={style.catalogInfo}>
					<div className={style.columnsItems}>
						<div className={style.id}>{setup.id}</div>
						<div>
							<div>{setup.name}</div>
						</div>
						<div>{setup.description.substring(0, 40)}...</div>
						<button className='cursor-pointer'>
							<Edit />
						</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default SetupsSettings
