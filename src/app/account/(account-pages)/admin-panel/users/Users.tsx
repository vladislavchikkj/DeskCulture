'use client'
import { useAdmin } from '@/hooks/useAdmin'
import { FC } from 'react'
import accountStyle from '../../account.module.scss'
import EditSVG from './icon/edit.svg'
import RemoveSVG from './icon/remove-user.svg'
import style from './users.module.scss'

const Users: FC = () => {
	const { allUsers, deleteUserById } = useAdmin()
	return (
		<div className={style.users}>
			<h1 className={accountStyle.title}>Users</h1>
			<div className={style.columnsName}>
				<span>id</span>
				<span>name</span>
				<span>e-mail</span>
				<span>phone</span>
				<span>orders</span>
				<span>del</span>
				<span>edit</span>
			</div>
			{allUsers.map(user => (
				<div key={user.id} className={style.userInfo}>
					<div className={style.columnsItems}>
						<div>{user.id}</div>
						<div>{user.name}</div>
						<div>{user.email}</div>
						<div>tel: {user.phone}</div>
						<div>orders</div>
						<button
							onClick={() => deleteUserById(user.id)}
							className='cursor-pointer'
						>
							<RemoveSVG />
						</button>
						<button className='cursor-pointer'>
							<EditSVG />
						</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default Users
