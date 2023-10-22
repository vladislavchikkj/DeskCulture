'use client'
import Heading from '@/ui/common/heading/Heading'
import { motion } from 'framer-motion'
import { FC } from 'react'
import ButtonSwitcher from '../buttonSwitcher/ButtonSwitcher'
import style from './catalogMenu.module.scss'

const CatalogMenu: FC<{ title: string }> = ({ title }) => {
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
		<motion.div
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			className={`${style.menu} container-f`}
		>
			<div className='overflow-hidden'>
				<motion.div variants={headingAnimation}>
					{title && <Heading variant='catalog'>{title}</Heading>}
				</motion.div>
			</div>
			<div className='overflow-hidden'>
				<motion.div custom={1.1} variants={headingAnimation}>
					<ButtonSwitcher />
				</motion.div>
			</div>
		</motion.div>
	)
}

export default CatalogMenu
