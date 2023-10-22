'use client'
import type { FC, PropsWithChildren } from 'react'
import { useRef } from 'react'
import ReactDOM from 'react-dom'
import Button from '../buttons/Button'
import style from './notifications.module.scss'
interface INotifications {
	isOpen: boolean
	closeNotifications: () => void
}

const Notifications: FC<PropsWithChildren<INotifications>> = ({
	children,
	isOpen,
	closeNotifications
}) => {
	const notificationsRef = useRef<HTMLElement | null>(
		document.getElementById('notifications')
	)

	if (!isOpen || !notificationsRef.current) {
		return null
	}

	return ReactDOM.createPortal(
		<div className={style.window}>
			<div className={style.content}>
				<div className={style.text}>{children}</div>
				<Button
					onClick={closeNotifications}
					variant={'black'}
					data-hover='Accept'
					className='text-15'
				>
					<span className='text-15'>Accept</span>
				</Button>
			</div>
		</div>,
		notificationsRef.current
	)
}

export default Notifications
