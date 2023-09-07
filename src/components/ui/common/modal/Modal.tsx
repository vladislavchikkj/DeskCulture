'use client'
import type { FC, PropsWithChildren } from 'react'
import { useRef } from 'react'
import ReactDOM from 'react-dom'
import { RiCloseFill } from 'react-icons/ri'
import style from './modal.module.scss'
interface IModal {
	isOpen: boolean
	closeModal: () => void
}

const Modal: FC<PropsWithChildren<IModal>> = ({
	children,
	isOpen,
	closeModal
}) => {
	const modalRef = useRef<HTMLElement | null>(document.getElementById('modal'))

	if (!isOpen || !modalRef.current) {
		return null
	}

	return ReactDOM.createPortal(
		<div className={style.overlay}>
			<div className={style.window}>
				<button onClick={closeModal}>
					<RiCloseFill />
				</button>
				{children}
			</div>
		</div>,
		modalRef.current
	)
}

export default Modal
