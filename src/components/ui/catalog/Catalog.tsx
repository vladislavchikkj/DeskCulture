'use client'
import { motion } from 'framer-motion'
import { FC, ReactNode, useEffect, useState } from 'react'

import Footer from '../layout/footer/Footer'

import { baseAnimation } from '@/components/animations/baseAnimation'
import { headingAnimation } from '@/components/animations/headingAnimation'
import { useLayout } from '@/components/context/LayoutContext'
import Heading from '../common/heading/Heading'
import ButtonSwitcher from './buttonSwitcher/ButtonSwitcher'
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

	return (
		<motion.section
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			className={`${catalogStyle.catalog}`}
			variants={baseAnimation}
		>
			<div className='container-f'>
				<>
					<motion.div variants={headingAnimation}>
						{title && <Heading variant='catalog'>{title}</Heading>}
					</motion.div>
					<motion.div custom={1.1} variants={headingAnimation}>
						<ButtonSwitcher />
					</motion.div>
				</>
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
