import { NextPage } from 'next'
import Link from 'next/link'
import { ReactNode } from 'react'

import { useActions } from '@/hooks/useActions'
import { useProfile } from '@/hooks/useProfile'

import style from './account.module.scss'

type AccountProps = {
	children: ReactNode
}

const Account: NextPage<AccountProps> = ({ children }) => {
	const { profile } = useProfile()
	const { logout } = useActions()

	return (
		<>
			<div className={`${style.wrapper} container-f`}>
				<div className={style.asideMenu}>
					<Link href='/account/my-orders'>
						<div className={style.myOrders}>MY ORDERS</div>
					</Link>
					<Link href='/account/account-settings'>
						<div className={style.settings}>ACCOUNT SETTINGS</div>
					</Link>
					<Link href='/account/change-password'>
						<div className={style.password}>CHANGE PASSWORD</div>
					</Link>
					<Link href='/auth'>
						<div className={style.logout} onClick={() => logout()}>
							LOG OUT
						</div>
					</Link>
				</div>
				<div className={style.leading}>{children}</div>
			</div>
		</>
	)
}

export default Account
