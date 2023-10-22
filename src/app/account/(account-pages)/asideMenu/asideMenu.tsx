'use client'

import { useActions } from '@/hooks/useActions'
import cn from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useAuth } from '@/hooks/useAuth'
import { FC, useState } from 'react'
import style from '../account.module.scss'

const AsideMenu: FC = () => {
	const { user } = useAuth()
	const { logout } = useActions()
	const pathname = usePathname()

	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<div className={style.menuBtn} onClick={() => setIsOpen(!isOpen)}>
				profile ¬
			</div>
			<aside className={cn(style.asideMenu, { [style.open]: isOpen })}>
				<Link
					href='/account/my-orders'
					className={cn({
						[style.active]: pathname === '/account/my-orders'
					})}
				>
					MY ORDERS
				</Link>
				<Link
					href='/account/account-settings'
					className={cn({
						[style.active]: pathname === '/account/account-settings'
					})}
				>
					ACCOUNT SETTINGS
				</Link>
				<Link
					href='/account/change-password'
					className={cn({
						[style.active]: pathname === '/account/change-password'
					})}
				>
					CHANGE PASSWORD
				</Link>
				{user?.isAdmin && (
					<div>
						<Link
							href='/account/admin-panel'
							className={cn({
								[style.active]: pathname === '/account/admin-panel'
							})}
						>
							<div className='mt-10'>ADMIN PANEL</div>
						</Link>
						<div className={style.submenu}>
							<Link
								href='/account/admin-panel/dashboard'
								className={cn({
									[style.active]: pathname === '/account/admin-panel/dashboard'
								})}
							>
								<span>Dashboard</span>
							</Link>
							<Link
								href='/account/admin-panel/users'
								className={cn({
									[style.active]: pathname === '/account/admin-panel/users'
								})}
							>
								<span>Users</span>
							</Link>
							<Link
								href='/account/admin-panel/catalog-settings'
								className={cn({
									[style.active]:
										pathname === '/account/admin-panel/catalog-settings'
								})}
							>
								<span className={style.catalogSettings}>
									(Catalog settings)
								</span>
							</Link>
							<div className='pl-5 pb-1 text-greyDark'>
								<Link
									href='/account/admin-panel/catalog-settings/products'
									className={cn({
										[style.active]:
											pathname ===
											'/account/admin-panel/catalog-settings/products'
									})}
								>
									<div className={style.box}>
										<span className={style.products}> - Products</span>
									</div>
								</Link>
								<Link
									href='/account/admin-panel/catalog-settings/categories'
									className={cn({
										[style.active]:
											pathname ===
											'/account/admin-panel/catalog-settings/categories'
									})}
								>
									<div className={style.box}>
										<span className={style.category}> - Categories</span>
									</div>
								</Link>
								<Link
									href='/account/admin-panel/catalog-settings/setups'
									className={cn({
										[style.active]:
											pathname ===
											'/account/admin-panel/catalog-settings/setups'
									})}
								>
									<div className={style.box}>
										<span className={style.setups}> - Setups</span>
									</div>
								</Link>
							</div>

							<Link
								href='/account/admin-panel/orders'
								className={cn({
									[style.active]: pathname === '/account/admin-panel/orders'
								})}
							>
								<span>Orders</span>
							</Link>
						</div>
					</div>
				)}
				<div className={style.logout}>
					<a href='/auth' onClick={() => logout()}>
						LOG OUT
					</a>
					<div className={style.dot}> &#9675;</div>
				</div>
				{/* <div className={style.close}>
					<CloseSVG />
				</div> */}
			</aside>
		</>
	)
}

export default AsideMenu
