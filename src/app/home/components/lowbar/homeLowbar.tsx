import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { FC, useRef } from 'react'
import ReactDOM from 'react-dom'

import style from './homelowbar.module.scss'
import LowbarBtn from './svg/lowbar.svg'

type Props = {
	children: React.ReactNode
	lowbarState?: boolean
}
export const LowBarAnimation = {
	hidden: {
		height: '0vh',
		opacity: 0,
		transition: { duration: 0.2 }
	},
	visible: (custom: number) => ({
		opacity: 1,
		height: '8vh',
		transition: { duration: 0.2, delay: custom * 0.2 }
	})
}

const LowBar: FC<Props> = ({ children, lowbarState }) => {
	const { scrollYProgress } = useScroll()
	const lowbarRef = useRef(document.getElementById('lowbar'))

	let minHeight = 8 // minimal height in vh
	let maxHeight = 40 // maximum height in vh

	// Transform scroll progress to height
	const height = useTransform(
		scrollYProgress,
		[0, 1], // scrollYProgress range
		[`${minHeight}vh`, `${maxHeight}vh`] // corresponding height range
	)
	if (!lowbarRef.current) {
		return null
	}

	return ReactDOM.createPortal(
		<>
			<AnimatePresence mode='wait'>
				{!lowbarState && (
					<motion.div
						initial='visible'
						whileInView='visible'
						exit='hidden'
						style={{ height: height }}
						className={`${style.lowbar} container-f`}
					>
						<motion.div
							variants={LowBarAnimation}
							className={style.lowbarWrapper}
						>
							<div className={style.select}>{children}</div>
							<div className={style.btn}>
								<LowbarBtn />
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>,
		lowbarRef.current
	)
}
export default LowBar
