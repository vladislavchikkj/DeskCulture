import cn from 'clsx'
import Link from 'next/link'
import { FC, useRef } from 'react'

import FavoriteBtn from '@/ui/common/buttons/favoritebtn/FavoriteBtn'
import Search from '@/ui/common/search/Search'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { useOutside } from '@/hooks/useOutside'

import Cart from '../../common/cart/Cart'

import style from './header.module.scss'
import Dots from './svg/icon_menu.svg.svg'

const Header: FC = () => {
	const { user } = useAuth()
	const { logout } = useActions()
	const { isShow, setIsShow, ref } = useOutside(false)
	const headerRef = useRef<HTMLElement>(null)

	return (
		<header className={style.header} ref={headerRef}>
			<div
				className={cn(
					`${style.headerWrapper}`,
					isShow ? `${style.openSearch}` : `${style.closeSearch}`
				)}
			>
				<div className='grid grid-flow-col'>
					<div className={style.menu}>
						<div>
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
						<div data-hover='About Us' className={style.textBtn}>
							<div className='flex gap-2'>About Us</div>
						</div>
					</div>
					<Link href={`/catalog`}>
						<div className={`${style.headerButton} ${style.hideBtn}`}>
							<div data-hover='Catalog' className={style.textBtn}>
								<div>Catalog</div>
							</div>
						</div>
					</Link>
				</div>
				<div className={style.mainLogo}>
					{!isShow ? (
						<Link href={`/`}>DeskCulture</Link>
					) : (
						<input type='text' />
					)}
				</div>
				<div className='grid grid-flow-col justify-self-end'>
					<span className={style.search}>
						<Search
							isShow={isShow}
							setIsShow={setIsShow}
							headerRef={headerRef}
						/>
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
			</div>
		</header>
	)
}

export default Header
