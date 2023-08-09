import cn from 'clsx'
import { FC, MutableRefObject } from 'react'
import { createPortal } from 'react-dom'

import Button from '@/ui/common/buttons/Button'

import { useOutside } from '@/hooks/useOutside'

import styleHeader from '../header.module.scss'

import style from './menu.module.scss'
import Dots from './svg/icon_menu.svg.svg'
import MenuLogo from './svg/menu.svg'

type MenuType = {
	headerRef: MutableRefObject<null | HTMLElement>
}
const Menu: FC<MenuType> = ({ headerRef }) => {
	const { isShow, setIsShow } = useOutside(false)
	return (
		<>
			<div
				className={styleHeader.menu}
				onClick={() => {
					setIsShow(!isShow)
				}}
			>
				<div>
					<Dots />
				</div>

				<div data-hover='menu' className={styleHeader.textBtn}>
					<div>menu</div>
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
										<div>navigate</div>
									</span>
									<div className={style.menuLogo}>
										<MenuLogo />
									</div>
								</div>
								<div className={style.menuListWrapper}>
									<div className={style.menuList}>
										<span className={style.menuListName}>Ready setup</span>
										<Button data-hover='↓' variant={'btnArrowMenu'}>
											↓
										</Button>
									</div>
									<div className={style.menuList}>
										<span className={style.menuListName}>
											Product categories
										</span>
										<Button data-hover='↓' variant={'btnArrowMenu'}>
											↓
										</Button>
									</div>
									<div className={style.menuList}>
										<span className={style.menuListName}>Catalog</span>
										<Button data-hover='↓' variant={'btnArrowMenu'}>
											↓
										</Button>
									</div>
									<div className={style.menuList}>
										<span className={style.menuListName}>About us</span>
										<Button data-hover='↓' variant={'btnArrowMenu'}>
											↓
										</Button>
									</div>
									<div className={style.menuList}>
										<span className={style.menuListName}>Track your order</span>
										<Button data-hover='↓' variant={'btnArrowMenu'}>
											↓
										</Button>
									</div>
								</div>
							</div>
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
