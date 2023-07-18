import React, { useEffect, useState } from 'react'

interface SmoothScrollContainerProps {
	children: React.ReactNode // Или React.ReactChildren
}

const SmoothScrollContainer: React.FC<SmoothScrollContainerProps> = ({
	children
}) => {
	const [scrollY, setScrollY] = useState(0)

	const handleScroll = () => {
		setScrollY(window.scrollY)
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	useEffect(() => {
		const targetScrollY = scrollY * 2
		window.scrollTo(0, targetScrollY)
	}, [scrollY])
	console.log(handleScroll)
	return <div>{children}</div>
}

export default SmoothScrollContainer
