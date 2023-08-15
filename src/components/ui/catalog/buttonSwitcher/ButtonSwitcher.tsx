import { FC } from 'react'

import Button from '@/ui/common/buttons/Button'

import catalogStyle from '../catalog.module.scss'

interface ButtonSwitcherProps {
	selectedButton: 'Categories' | 'Setup' | 'Products'
	handleCategoriesClick: () => void
	handleSetupClick: () => void
	handleProductsClick: () => void
}

const ButtonSwitcher: FC<ButtonSwitcherProps> = ({
	selectedButton,
	handleCategoriesClick,
	handleSetupClick,
	handleProductsClick
}) => (
	<div className={catalogStyle.btnWrapper}>
		<Button
			data-hover='Categories'
			variant={selectedButton === 'Categories' ? 'black' : 'grey'}
			onClick={handleCategoriesClick}
		>
			Categories
		</Button>
		<Button
			data-hover='Setup'
			variant={selectedButton === 'Setup' ? 'black' : 'grey'}
			onClick={handleSetupClick}
		>
			Setup
		</Button>
		<Button
			data-hover='Products'
			variant={selectedButton === 'Products' ? 'black' : 'grey'}
			onClick={handleProductsClick}
		>
			Products
		</Button>
	</div>
)

export default ButtonSwitcher
