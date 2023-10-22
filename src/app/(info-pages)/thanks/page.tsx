import Order from '@/app/account/(account-pages)/my-orders/Order'
import { baseAnimation } from '@/components/animations/baseAnimation'
import { useLayout } from '@/components/context/LayoutContext'
import { NO_INDEX_PAGE } from '@/constants/app.constants'
import { useActions } from '@/hooks/useActions'
import Button from '@/ui/common/buttons/Button'
import Footer from '@/ui/layout/footer/Footer'
import { motion } from 'framer-motion'
import { Metadata } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'
import style from './thanks.module.scss'

export const metadata: Metadata = {
	title: 'Thanks',
	...NO_INDEX_PAGE
}

export default function ThanksPage() {
	const { reset } = useActions()
	//решить проблему с дублирование
	const { updateLayout } = useLayout()
	useEffect(() => {
		updateLayout(false)
	}, [])
	return (
		<motion.section
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			variants={baseAnimation}
		>
			<div className='container-f'>
				<div className={style.content}>
					<div className={style.title}>Thanks for pay!</div>
					<Order />
					<div className={style.btn}>
						<Link href={'/'}>
							<Button
								data-hover='Go to shop'
								variant={'grey'}
								onClick={() => reset()}
							>
								Go to shop
							</Button>
						</Link>
					</div>
				</div>
			</div>
			<Footer />
		</motion.section>
	)
}
