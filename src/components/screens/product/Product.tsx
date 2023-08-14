import { FC } from 'react'

import Meta from '@/ui/Meta'
import Layout from '@/ui/layout/Layout'

const Product: FC = () => {
	return (
		<Meta title='Product'>
			<Layout inView={false} children={undefined}></Layout>
		</Meta>
	)
}

export default Product
