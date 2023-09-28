'use client'

import { baseAnimation } from '@/components/animations/baseAnimation'
import { useLayout } from '@/components/context/LayoutContext'
import { useActions } from '@/hooks/useActions'
import cn from 'classnames'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { FC, useEffect } from 'react'
import style from './account.module.scss'

type props = {
	children: React.ReactNode
}

const Account: FC<props> = ({ children }) => {
	//решить проблему с дублирование
	const { updateLayout } = useLayout()
	useEffect(() => {
		updateLayout(false)
	}, [])
	const { logout } = useActions()
	const pathname = usePathname()
	return (
		<motion.div
			viewport={{ once: true }}
			initial='hidden'
			whileInView='visible'
		>
			<div className={`${style.wrapper} container-f`}>
				<div className={style.asideMenu}>
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
							<span>
								Catalog settings
								<div className='pl-5 pt-1 pb-1 text-greyDark'>
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
							</span>
						</Link>
						<Link
							href='/account/admin-panel/orders'
							className={cn({
								[style.active]: pathname === '/account/admin-panel/orders'
							})}
						>
							<span>Orders</span>
						</Link>
					</div>
					<Link href='/auth' onClick={() => logout()}>
						<div className={style.logout}>LOG OUT</div>
					</Link>
				</div>
				<motion.div
					viewport={{ once: true }}
					initial='hidden'
					whileInView='visible'
					variants={baseAnimation}
					className={style.leading}
				>
					{children}
				</motion.div>
			</div>
		</motion.div>
	)
}

export default Account
