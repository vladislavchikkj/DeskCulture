import cn from 'clsx'
import Link from 'next/link'
import { FC, MutableRefObject } from 'react'

import Button from '@/ui/common/buttons/Button'

import { useOutside } from '@/hooks/useOutside'

import styleHeader from '../header.module.scss'

import { menuAnimation } from '@/components/animations/asideAnimation'
import { useAuth } from '@/hooks/useAuth'
import PopUp from '@/ui/common/asidePanel/PopUp'
import { motion } from 'framer-motion'
import style from './menu.module.scss'
import Dots from './svg/icon_menu.svg.svg'
import MenuLogo from './svg/menu.svg'

type MenuType = {
	headerRef: MutableRefObject<null | HTMLElement>
	wrapperRef?: MutableRefObject<null | HTMLElement>
}
const Menu: FC<MenuType> = ({ headerRef, wrapperRef }) => {
	const { user } = useAuth()
	const { isShow, setIsShow, ref, addRef } = useOutside(false)
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
			<div className={styleHeader.menu} onClick={() => setIsShow(!isShow)}>
				<div>
					<Dots />
				</div>
				<div data-hover='menu' className={styleHeader.textBtn}>
					<div className={style.menuName}>menu</div>
				</div>
			</div>

			<PopUp isOpen={isShow} closeAsidePanel={() => setIsShow(!isShow)}>
				<motion.div
					initial='hidden'
					whileInView='visible'
					variants={menuAnimation}
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
							<Link
								href={user ? `/account` : '/auth'}
								className={style.menuList}
							>
								<span className={style.menuListName}>Account</span>
								<Button data-hover='↓' variant={'btnArrowMenu'}>
									↓
								</Button>
							</Link>
							<Link href={`/contacts`} className={style.menuList}>
								<span className={style.menuListName}>Contacts</span>
								<Button data-hover='↓' variant={'btnArrowMenu'}>
									↓
								</Button>
							</Link>
							<Link href={`/catalog`} className={style.menuList}>
								<span className={style.menuListName}>Catalog</span>
								<Button data-hover='↓' variant={'btnArrowMenu'}>
									↓
								</Button>
							</Link>
							<Link href={'/cart'} className={style.menuList}>
								<span className={style.menuListName}>Your Bag</span>
								<Button data-hover='↓' variant={'btnArrowMenu'}>
									↓
								</Button>
							</Link>
						</div>
					</div>
					{!user && (
						<div className={`${style.menuBtn} container-f`}>
							<Link href={'/auth'}>
								<Button data-hover='Sign in' variant={'grey'}>
									Sign in
								</Button>
							</Link>
						</div>
					)}
				</motion.div>
				<div
					onClick={() => setIsShow(!isShow)}
					className={style.popupWrapper}
				></div>
			</PopUp>
		</>
	)
}

export default Menu
