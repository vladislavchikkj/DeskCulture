import { AnimatePresence, motion } from 'framer-motion'
import { FC, ReactNode } from 'react'

import { useOutside } from '@/hooks/useOutside'

import style from './detail.module.scss'

type props = {
	title: string
	content: ReactNode
	open?: boolean
}
const Detail: FC<props> = ({ title, content, open }) => {
	const { isShow, setIsShow, ref, setScrolling } = useOutside(
		false || (open as boolean)
	)
	const sliderAnimation = {
		hidden: {
			height: 0,
			opacity: 0,
			transition: { duration: 0.4 }
		},
		visible: (custom: number) => ({
			opacity: 1,
			height: 'auto',
			transition: { duration: 0.4, delay: custom * 0.2 }
		})
	}

	return (
		<div
			ref={ref}
			className={style.detail}
			onClick={() => {
				setIsShow(!isShow)
				setScrolling(false)
			}}
		>
			<div className={style.detailButton}>
				<div>{title}</div>
				<div>{!isShow ? '+' : '-'}</div>
			</div>
			<AnimatePresence mode='wait'>
				{isShow && (
					<motion.div
						initial='hidden'
						whileInView='visible'
						exit='hidden'
						className={style.detaiInfo}
					>
						<motion.div variants={sliderAnimation}>
							<div className='pt-5 pb-5'>{content}</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default Detail
