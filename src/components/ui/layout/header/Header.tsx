import { FC } from 'react'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import style from './header.module.scss'
import Favorite from './svg/Heart.svg.svg'
import Bag from './svg/bag.svg.svg'
import Dots from './svg/icon_menu.svg.svg'
import Search from './svg/search.svg'

const Header: FC = () => {
	const { user } = useAuth()
	const { logout } = useActions()
	return (
		<header className={style.header}>
			<div className='flex'>
				<div className={style.menu}>
					<div className='pb-0.5'>
						<Dots />
					</div>
					<span>menu</span>
				</div>
				<div className={style.headerButton}>
					<span className='flex gap-2'>
						For the client
						<div className='rotate-90'>›</div>
					</span>
				</div>
				<div className={style.headerButton}>
					<span>About us</span>
				</div>
				<div className={style.headerButton}>
					<span>Contacts</span>
				</div>
			</div>
			<div className={style.mainLogo}>DeskCulture</div>
			<div className='flex'>
				<div className={style.headerButton}>
					<span className='flex gap-2'>
						<Search />
						<span className={style.search}>search</span>
					</span>
				</div>
				<div className={style.headerButton}>
					<span>Sign Up</span>
				</div>
				<div className={style.headerButton}>
					<span>
						{!!user && <button onClick={() => logout()}>Logout</button>}
					</span>
				</div>
				<div className={style.favorites}>
					<Favorite />
				</div>
				<div className='cursor-pointer'>
					<Bag />
				</div>
			</div>
		</header>
	)
}

export default Header
