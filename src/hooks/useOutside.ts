import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

type TypeOut = {
	ref: any
	isShow: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
	addRef?: any
	setScrolling: Dispatch<SetStateAction<boolean>>
}

export const useOutside = (
	initialIsVisible: boolean,
	addRefNeeded?: boolean
): TypeOut => {
	const [isShow, setIsShow] = useState(initialIsVisible)
	const ref = useRef<HTMLElement>(null)
	const addRef = useRef<HTMLElement>(null)
	const [scrolling, setScrolling] = useState(true)

	const handleClickOutside = (event: any) => {
		if (addRef.current && addRef.current.contains(event.target)) {
			return
		}

		if (
			ref.current &&
			event.target !== ref.current &&
			!ref.current.contains(event.target)
		) {
			setIsShow(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)

		if (isShow && scrolling) {
			document.body.style.overflow = 'hidden' // Запрещаем прокрутку страницы
		} else {
			document.body.style.overflow = '' // Восстанавливаем прокрутку страницы
		}

		return () => {
			document.removeEventListener('click', handleClickOutside, true)
			document.body.style.overflow = '' // Восстанавливаем прокрутку страницы при размонтировании компонента
		}
	}, [isShow])

	return addRefNeeded
		? { ref, isShow, setIsShow, addRef, setScrolling }
		: { ref, isShow, setIsShow, setScrolling }
}
