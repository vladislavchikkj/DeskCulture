'use client'
import { useAuth } from '@/hooks/useAuth'
import { SetupsService } from '@/services/setups.service'
import { TypePaginationSetup } from '@/types/product.interface'
import { ISetups } from '@/types/setups.interface'
import Button from '@/ui/common/buttons/Button'
import Modal from '@/ui/common/modal/Modal'
import { FC, useState } from 'react'
import Del from '../icon/delete.svg'
import Edit from '../icon/edit.svg'
import LeaveSetupForm from './(leaveSetupForm)/LeaveSetupForm'
import UpdateSetupForm from './(updateSetupForm)/UpdateSetupForm'
import style from './setups.module.scss'

const SetupsSettings: FC<TypePaginationSetup> = ({ setups }) => {
	const [selectedSetups, setSelectedSetups] = useState<ISetups | null>(null)
	const [isModalOpenCreate, setModalOpenCreate] = useState(false)
	const [isModalOpenUpdate, setModalOpenUpdate] = useState(false)
	const [categoryList, setCategoryList] = useState(setups)
	const { user } = useAuth()
	const handleSetupUpdate = async () => {
		const updatedCategories = await SetupsService.getAll()
		setCategoryList(updatedCategories)
	}
	return (
		<div className={style.catalog}>
			{user && (
				<Modal
					isOpen={isModalOpenCreate}
					closeModal={() => setModalOpenCreate(false)}
				>
					<LeaveSetupForm setups={setups} />
				</Modal>
			)}
			{user && (
				<Modal
					isOpen={isModalOpenUpdate}
					closeModal={() => {
						setModalOpenUpdate(false)
						setSelectedSetups(null) // сбрасываем выбранный продукт при закрытии модального окна
					}}
				>
					<UpdateSetupForm
						setups={setups}
						setup={selectedSetups}
						updateSetups={handleSetupUpdate}
					/>
				</Modal>
			)}
			<div className={style.btn}>
				<Button
					onClick={() => setModalOpenCreate(true)}
					data-hover='+ add new setup'
					variant={'black'}
				>
					+ add new setup
				</Button>
			</div>
			<div className={style.columnsName}>
				<span>id</span>
				<span>name</span>
				<span>description</span>
				<span>edit</span>
				<span>del</span>
			</div>
			{setups.map(setup => (
				<div key={setup.id} className={style.catalogInfo}>
					<div className={style.columnsItems}>
						<div className={style.id}>{setup.id}</div>
						<div>
							<div>{setup.name}</div>
						</div>
						<div>{setup.description.substring(0, 40)}...</div>
						<button
							className='cursor-pointer'
							onClick={() => {
								setModalOpenUpdate(true)
								setSelectedSetups(setup)
							}}
						>
							<Edit />
						</button>
						<button
							onClick={async () => {
								if (
									window.confirm('Вы уверены, что хотите удалить этот товар?')
								) {
									await SetupsService.delete(setup.id)
									setCategoryList(categoryList.filter(p => p.id !== setup.id))
								}
							}}
							className='cursor-pointer pt-1'
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

export default SetupsSettings
