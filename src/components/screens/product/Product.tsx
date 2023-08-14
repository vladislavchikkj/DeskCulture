import { FC } from 'react'

import Meta from '@/ui/Meta'
import Layout from '@/ui/layout/Layout'

import style from './product.module.scss'

const Product: FC = () => {
	return (
		<Meta title='Product'>
			<Layout inView={false}>
				<div className={style.product}>Name</div>
			</Layout>
		</Meta>
	)
}

export default Product
