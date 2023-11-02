'use client'
import { useLayout } from '@/components/context/LayoutContext'
import Button from '@/ui/common/buttons/Button'
import Link from 'next/link'
import { useEffect } from 'react'
import style from './wrong.module.scss'

// export const metadata: Metadata = {
// 	title: 'Wrong',
// 	...NO_INDEX_PAGE
// }

export default function ThanksPage() {
	//решить проблему с дублирование
	const { updateLayout } = useLayout()
	useEffect(() => {
		updateLayout(false)
	}, [])
	return (
		<div className='container-f'>
			<div className={style.title}>
				Wrong, the product has not been paid for!
			</div>
			<div className={style.btn}>
				<Link href={'/'}>
					<Button data-hover='Go to shop' variant={'grey'}>
						Go to shop
					</Button>
				</Link>
			</div>
		</div>
	)
}
