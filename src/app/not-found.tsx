import Button from '@/ui/common/buttons/Button'
import Heading from '@/ui/common/heading/Heading'
import Link from 'next/link'

export default function NotFound() {
	return (
		<div className='container-f h-screen flex items-center justify-center flex-col'>
			<Heading variant='auth'>Not Found</Heading>
			<div>Could not find requested resource</div>
			<Link href='/'>
				<Button data-hover='Go home' variant='grey' className='mt-5'>
					Go home
				</Button>
			</Link>
		</div>
	)
}
