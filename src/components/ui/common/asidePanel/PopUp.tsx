'use client'
import type { FC, PropsWithChildren } from 'react'
import { useRef } from 'react'
import ReactDOM from 'react-dom'

interface IModal {
	isOpen: boolean
	closeAsidePanel: () => void
}

const PopUp: FC<PropsWithChildren<IModal>> = ({
	children,
	isOpen,
	closeAsidePanel
}) => {
	const PopUpRef = useRef<HTMLElement | null>(document.getElementById('PopUp'))

	if (!isOpen || !PopUpRef.current) {
		return null
	}

	return ReactDOM.createPortal(<>{children}</>, PopUpRef.current)
}

export default PopUp
