// ... other imports
'use client'
import { motion } from 'framer-motion'
import { FC, ReactNode, useEffect, useState } from 'react'

import Footer from '../layout/footer/Footer'

import { useLayout } from '@/components/context/LayoutContext'
import catalogStyle from './catalog.module.scss'

interface ICatalog {
	title?: string
	children: ReactNode
}

const Catalog: FC<ICatalog> = ({ title, children }) => {
	//решить проблему с дублирование
	const { updateLayout } = useLayout()
	useEffect(() => {
		updateLayout(false)
	}, [])

	const [selectedButton, setSelectedButton] = useState<
		'Categories' | 'Setup' | 'Products'
	>('Categories')

	const handleClick = (button: 'Categories' | 'Setup' | 'Products') => {
		setSelectedButton(button)
	}
	const headingAnimation = {
		hidden: {
			y: 300,
			opacity: 0
		},
		visible: (custom: number) => ({
			y: 0,
			opacity: 1,
			transition: { duration: 0.4, delay: custom * 0.2 }
		})
	}

	return (
		<motion.section
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			className={`${catalogStyle.catalog}`}
		>
			<div className='container-f'>
				<motion.div custom={1.2} variants={headingAnimation}>
					{selectedButton === 'Categories' && <>{children}</>}
					{selectedButton === 'Setup' && <>{children}</>}
					{selectedButton === 'Products' && <>{children}</>}
				</motion.div>
			</div>
			<Footer />
		</motion.section>
	)
}

export default Catalog
