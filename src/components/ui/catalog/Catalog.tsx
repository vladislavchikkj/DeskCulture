// ... other imports
import { motion } from 'framer-motion'
import { FC, useState } from 'react'

import { TypePaginationСatalog } from '@/types/product.interface'

import Heading from '../common/heading/Heading'
import Footer from '../layout/footer/Footer'

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
	const [selectedButton, setSelectedButton] = useState<
		'Categories' | 'Setup' | 'Products'
	>('Categories')

	const handleClick = (button: 'Categories' | 'Setup' | 'Products') => {
		setSelectedButton(button)
	}
	const textAnimation = {
		hidden: {
			y: -100,
			opacity: 0
		},
		visible: {
			y: 0,
			opacity: 1
		}
	}
	return (
		<motion.section
			initial='hidden'
			whileInView='visible'
			className={`${catalogStyle.catalog}`}
		>
			<div className='container-f'>
				<motion.div variants={textAnimation}>
					{title && <Heading variant='catalog'>{title}</Heading>}
					<ButtonSwitcher
						selectedButton={selectedButton}
						handleCategoriesClick={() => handleClick('Categories')}
						handleSetupClick={() => handleClick('Setup')}
						handleProductsClick={() => handleClick('Products')}
					/>
				</motion.div>
				{selectedButton === 'Categories' && (
					<CategoryList categories={data.categories} />
				)}
				{selectedButton === 'Setup' && <SetupList setups={data.setups} />}
				{selectedButton === 'Products' && (
					<ProductList initialProducts={data.products} />
				)}
			</div>
			<Footer />
		</motion.section>
	)
}

export default Catalog
