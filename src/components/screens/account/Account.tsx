'use client'

import { useActions } from '@/hooks/useActions'

import { FC } from 'react'
import style from './account.module.scss'

type props = {
	tag?: string | string[] | undefined[]
}

const Account: FC<props> = tag => {
	const { logout } = useActions()

	let content

	if (tag === 'my-orders') {
		content = (
			<div>
				<h1>MY ORDERS</h1>
				Здесь отображаете информацию о заказах
			</div>
		)
	} else if (tag === 'account-settings') {
		content = (
			<div>
				<h1>ACCOUNT SETTINGS</h1>
				Здесь отображаете информацию о настройках аккаунта
			</div>
		)
	} else if (tag === 'change-password') {
		content = (
			<div>
				<h1>CHANGE PASSWORD</h1>
				Здесь отображаете форму изменения пароля
			</div>
		)
	} else {
		content = (
			<div>
				<h1>Unknown Page</h1>
				Отобразите сообщение об ошибке или что-то по умолчанию
			</div>
		)
	}

	return (
		<div>
			<div className={`${style.wrapper} container-f`}>
				<div className={style.asideMenu}>
					<a href='/account/my-orders'>MY ORDERS</a>
					<a href='/account/account-settings'>ACCOUNT SETTINGS</a>
					<a href='/account/change-password'>CHANGE PASSWORD</a>
					<a href='/auth' onClick={() => logout()}>
						LOG OUT
					</a>
				</div>
				<div className={style.leading}>{content}</div>
			</div>
		</div>
	)
}

export default Account
