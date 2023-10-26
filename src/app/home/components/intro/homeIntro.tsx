import { textAnimation } from '@/components/animations/homeAnimation'
import { motion } from 'framer-motion'
import { FC } from 'react'

import style from './homeintro.module.scss'
import Logo from './svg/newlogo.svg'

const HomeIntro: FC = () => {
	return (
		<>
			<motion.div
				initial='hidden'
				viewport={{ once: true }}
				whileInView='visible'
				className={`${style.homeIntro} container-f`}
			>
				<div className={style.title}>
					<h1 translate='no'>
						<div className='overflow-hidden'>
							<motion.div variants={textAnimation}>
								<a>Create. Your.</a>
							</motion.div>
						</div>
						<div className='overflow-hidden'>
							<motion.div variants={textAnimation}>
								<a translate='no' className='text-white block'>
									Workspace.
								</a>
							</motion.div>
						</div>
					</h1>
				</div>
				<div className={style.lowSide}>
					<motion.a variants={textAnimation} className={style.logo}>
						<Logo />
					</motion.a>
					<motion.a variants={textAnimation} className={style.info}>
						Create a workspace that epitomizes your refined preferences while
						igniting your drive for productivity.
					</motion.a>
				</div>
			</motion.div>
		</>
	)
}
export default HomeIntro
