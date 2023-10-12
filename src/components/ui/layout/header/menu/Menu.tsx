import cn from 'clsx'
import Link from 'next/link'
import { FC, MutableRefObject, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import Button from '@/ui/common/buttons/Button'

import { useOutside } from '@/hooks/useOutside'

import styleHeader from '../header.module.scss'

import { useAuth } from '@/hooks/useAuth'
import AsidePanel from '@/ui/common/asidePanel/asidePanel'
import FavoriteContent from '@/ui/common/favoriteCard/favoriteContent/FavoriteContent'
import { emitCustomEvent } from '@/utils/emitCustomEvent'
import style from './menu.module.scss'
import Dots from './svg/icon_menu.svg.svg'
import MenuLogo from './svg/menu.svg'

type MenuType = {
	headerRef: MutableRefObject<null | HTMLElement>
	wrapperRef?: MutableRefObject<null | HTMLElement>
}
const Menu: FC<MenuType> = ({ headerRef, wrapperRef }) => {
	const { user } = useAuth()
	const [asidePanelIsOpen, setAsidePanelIsOpen] = useState(false)
	const { isShow, setIsShow, ref, addRef } = useOutside(false)
	console.log(asidePanelIsOpen)
	const clickHandler = () => {
		setIsShow(false)
	}
	useEffect(() => {
		document.addEventListener('clickSearchOpener', clickHandler)
		return () => {
			document.removeEventListener('clickSearchOpener', clickHandler)
		}
	}, [])
	if (isShow) {
		if (wrapperRef && wrapperRef.current) {
			wrapperRef.current.style.backgroundColor = 'white'
		}
	} else {
		if (wrapperRef && wrapperRef.current) {
			wrapperRef.current.style.backgroundColor = ''
		}
	}
	return (
		<>
			<div
				className={styleHeader.menu}
				onClick={() => {
					setIsShow(!isShow)
					emitCustomEvent('clickMenuhOpener')
				}}
			>
				<div>
					<Dots />
				</div>

				<div data-hover='menu' className={styleHeader.textBtn}>
					<div className={style.menuName}>menu</div>
				</div>
			</div>
			{headerRef.current &&
				isShow &&
				createPortal(
					<>
						<div
							className={cn(
								`${style.searchMenu}`,
								isShow ? `${style.openMenu}` : `${style.closeMenu}`
							)}
						>
							<div className={`${style.menuWrapper} container-f`}>
								<div className={style.menuSide}>
									<span className={style.menuNav}>
										<Link
											onClick={() => {
												setIsShow(!isShow)
											}}
											href={'/'}
										>
											<div className={style.home}>Home</div>
										</Link>
									</span>
									<div className={style.menuLogo}>
										<MenuLogo />
									</div>
								</div>
								<div
									onClick={() => {
										setIsShow(!isShow)
									}}
									className={style.menuListWrapper}
								>
									<div className={style.menuList}>
										<span className={style.menuListName}>Account</span>
										<Button data-hover='↓' variant={'btnArrowMenu'}>
											↓
										</Button>
									</div>
									<div className={style.menuList}>
										<span className={style.menuListName}>Contacts</span>
										<Button data-hover='↓' variant={'btnArrowMenu'}>
											↓
										</Button>
									</div>
									<Link href={`/catalog`} className={style.menuList}>
										<span className={style.menuListName}>Catalog</span>
										<Button data-hover='↓' variant={'btnArrowMenu'}>
											↓
										</Button>
									</Link>
									<div
										className={style.menuList}
										onClick={() => setAsidePanelIsOpen(!asidePanelIsOpen)}
									>
										<span className={style.menuListName}>Favorites</span>
										<Button data-hover='↓' variant={'btnArrowMenu'}>
											↓
										</Button>
										<AsidePanel
											isOpen={!asidePanelIsOpen}
											closeAsidePanel={() =>
												setAsidePanelIsOpen(!asidePanelIsOpen)
											}
										>
											<FavoriteContent
												setIsShow={() => setAsidePanelIsOpen(!asidePanelIsOpen)}
											></FavoriteContent>
										</AsidePanel>
									</div>
									<div className={style.menuList}>
										<span className={style.menuListName}>Your Bag</span>
										<Button data-hover='↓' variant={'btnArrowMenu'}>
											↓
										</Button>
									</div>
								</div>
							</div>
							{!user && (
								<div className={`${style.menuBtn} container-f`}>
									<Button data-hover='Sign in' variant={'grey'}>
										Sign in
									</Button>
								</div>
							)}
						</div>
						<div
							onClick={() => setIsShow(!isShow)}
							className={cn(
								`${style.popupWrapper}`,
								isShow ? 'dark-bg' : 'off-dark-bg '
							)}
						></div>
					</>,
					headerRef.current
				)}
		</>
	)
}

export default Menu
