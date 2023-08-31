import Heading from '@/ui/common/heading/Heading'
import Link from 'next/link'

import Layout from './layout'

export default function NotFound() {
	return (
		<Layout>
			<Heading>Not Found</Heading>
			<p>Could not find requested resource</p>
			<p>
				View
				<Link href='/explorer' className=' Mltext-primary'>
					all products
				</Link>
			</p>
		</Layout>
	)
}
