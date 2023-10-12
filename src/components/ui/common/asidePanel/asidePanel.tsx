'use client'
import type { FC, PropsWithChildren } from 'react'
import { useRef } from 'react'
import ReactDOM from 'react-dom'

interface IModal {
	isOpen: boolean
	closeAsidePanel: () => void
}

const AsidePanel: FC<PropsWithChildren<IModal>> = ({
	children,
	isOpen,
	closeAsidePanel
}) => {
	const asidePanelRef = useRef<HTMLElement | null>(
		document.getElementById('asidePanel')
	)

	if (!isOpen || !asidePanelRef.current) {
		return null
	}

	return ReactDOM.createPortal(<>{children}</>, asidePanelRef.current)
}

export default AsidePanel
