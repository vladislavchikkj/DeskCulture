'use client'

import { baseAnimation } from '@/components/animations/baseAnimation'
import { useLayout } from '@/components/context/LayoutContext'
import { useActions } from '@/hooks/useActions'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useAuth } from '@/hooks/useAuth'
import { FC, useEffect } from 'react'
import style from './account.module.scss'
import AsideMenu from './asideMenu/asideMenu'

type props = {
	children: React.ReactNode
}

const Account: FC<props> = ({ children }) => {
	const { updateLayout } = useLayout()
	useEffect(() => {
		updateLayout(false)
	}, [])
	const { user } = useAuth()
	if (!user)
		return (
			<div className={style.message}>
				<Link href={'/auth'}>Register or log in to see account...</Link>
			</div>
		)
	return (
		<motion.div
			viewport={{ once: true }}
			initial='hidden'
			whileInView='visible'
		>
			<div className={`${style.wrapper} container-f`}>
				<AsideMenu />
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
