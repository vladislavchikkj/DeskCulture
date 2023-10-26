import { FC } from 'react'

import Button from '@/ui/common/buttons/Button'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import catalogStyle from '../catalog.module.scss'

const ButtonSwitcher: FC = () => {
	const pathname = usePathname()
	return (
		<div className={catalogStyle.btnWrapper}>
			<Link href='/catalog/categories'>
				<Button
					data-hover='Categories'
					variant={pathname === '/catalog/categories' ? 'black' : 'grey'}
				>
					Categories
				</Button>
			</Link>
			<Link href='/catalog/setups'>
				<Button
					data-hover='Setups'
					variant={pathname === '/catalog/setups' ? 'black' : 'grey'}
				>
					Setups
				</Button>
			</Link>
			<Link href='/catalog/products'>
				<Button
					data-hover='Products'
					variant={pathname === '/catalog/products' ? 'black' : 'grey'}
				>
					Products
				</Button>
			</Link>
		</div>
	)
}

export default ButtonSwitcher
