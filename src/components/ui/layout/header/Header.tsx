import Link from 'next/link'
import { FC } from 'react'

import FavoriteBtn from '@/ui/common/buttons/favoritebtn/FavoriteBtn'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import Cart from '../../common/cart/Cart'

import style from './header.module.scss'
import Dots from './svg/icon_menu.svg.svg'
import Search from './svg/search.svg'

const Header: FC = () => {
	const { user } = useAuth()
	const { logout } = useActions()

	return (
		<header className={style.header}>
			<div className='grid grid-flow-col'>
				<div className={style.menu}>
					<div className='pb-0.5'>
						<Dots />
					</div>
					<div data-hover='menu' className={style.textBtn}>
						<div>menu</div>
					</div>
				</div>
				<div className={`${style.headerButton} ${style.hideBtn}`}>
					<div data-hover='For the client ›' className={style.textBtn}>
						<div className='flex gap-2'>
							For the client
							<div className='rotate-90'>›</div>
						</div>
					</div>
				</div>
				<div className={`${style.headerButton} ${style.hideBtn}`}>
					<div data-hover='For the client ›' className={style.textBtn}>
						<div className='flex gap-2'>About Us</div>
					</div>
				</div>
				<div className={`${style.headerButton} ${style.hideBtn}`}>
					<div data-hover='Catalog' className={style.textBtn}>
						<div>Catalog</div>
					</div>
				</div>
			</div>
			<div className={style.mainLogo}>DeskCulture</div>
			<div className='grid grid-flow-col justify-self-end'>
				<span className={style.search}>
					<Search />
					<span className='pt-0.5 pl-2'>search</span>
				</span>
				{!user && (
					<div className={style.headerButton}>
						<span className='pl-6 pr-6'>
							<div data-hover='Sign Up' className={style.textBtn}>
								<div>Sign Up</div>
							</div>
						</span>
					</div>
				)}
				<div>
					{!!user ? (
						<button className={style.headerButton} onClick={() => logout()}>
							<span className='pl-6 pr-6'>
								<div data-hover='Kushinada' className={style.textBtn}>
									<div>Kushinada</div>
								</div>
							</span>
						</button>
					) : (
						<Link href={`/auth`}>
							<span className={style.headerButton}>
								<span className='pl-6 pr-6'>
									<div data-hover='Log In' className={style.textBtn}>
										<div>Log In</div>
									</div>
								</span>
							</span>
						</Link>
					)}
				</div>
				<FavoriteBtn />
				<Cart />
			</div>
		</header>
	)
}

export default Header
