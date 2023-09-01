// ... other imports
'use client'
import { motion } from 'framer-motion'
import { FC, useEffect, useState } from 'react'

import { TypePaginationСatalog } from '@/types/product.interface'

import Heading from '../common/heading/Heading'
import Footer from '../layout/footer/Footer'

import { useLayout } from '@/components/context/LayoutContext'
import ButtonSwitcher from './buttonSwitcher/ButtonSwitcher'
import catalogStyle from './catalog.module.scss'
import CategoryList from './categoryList/CategoryList'
import ProductList from './productsList/ProductList'
import SetupList from './setupsList/SetupsList'

interface ICatalog {
	data: TypePaginationСatalog
	title?: string
}

const Catalog: FC<ICatalog> = ({ data, title }) => {
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
				<div className='overflow-hidden'>
					<motion.div variants={headingAnimation}>
						{title && <Heading variant='catalog'>{title}</Heading>}
					</motion.div>
				</div>
				<div className='overflow-hidden'>
					<motion.div custom={1.1} variants={headingAnimation}>
						<ButtonSwitcher
							selectedButton={selectedButton}
							handleCategoriesClick={() => handleClick('Categories')}
							handleSetupClick={() => handleClick('Setup')}
							handleProductsClick={() => handleClick('Products')}
						/>
					</motion.div>
				</div>
				<motion.div custom={1} variants={headingAnimation}>
					{selectedButton === 'Categories' && (
						<CategoryList categories={data.categories} />
					)}
					{selectedButton === 'Setup' && <SetupList setups={data.setups} />}
					{selectedButton === 'Products' && (
						<ProductList initialProducts={data.products} />
					)}
				</motion.div>
			</div>
			<Footer />
		</motion.section>
	)
}

export default Catalog
