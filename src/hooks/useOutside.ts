import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

type TypeOut = {
	ref: any
	isShow: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
	addRef?: any
}

export const useOutside = (
	initialIsVisible: boolean,
	addRefNeeded?: boolean
): TypeOut => {
	const [isShow, setIsShow] = useState(initialIsVisible)
	const ref = useRef<HTMLElement>(null)
	const addRef = useRef<HTMLElement>(null)

	const handleClickOutside = (event: any) => {
		if (addRefNeeded && ref.current) {
			console.log(addRef.current?.parentElement)
			console.log(addRef.current === event.target)
		}
		if (ref.current && !ref.current.contains(event.target)) {
			if (addRef.current && addRef.current.contains(event.target)) {
				return
			}
			setIsShow(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)

		if (isShow) {
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
		? { ref, isShow, setIsShow, addRef }
		: { ref, isShow, setIsShow }
}
