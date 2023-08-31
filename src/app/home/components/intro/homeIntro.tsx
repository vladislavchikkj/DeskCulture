import { motion } from 'framer-motion'
import { FC } from 'react'

import style from './homeintro.module.scss'
import Logo from './svg/newlogo.svg'

const HomeIntro: FC = () => {
	const textAnimation = {
		hidden: {
			y: 300,
			opacity: 0
		},
		visible: (custom: number) => ({
			y: 0,
			opacity: 1,
			transition: { duration: 0.6, delay: custom * 0.2 }
		})
	}
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
								<span>Create. Your.</span>
							</motion.div>
						</div>
						<div className='overflow-hidden'>
							<motion.div variants={textAnimation}>
								<span translate='no' className='text-white block'>
									Workspace.
								</span>
							</motion.div>
						</div>
					</h1>
				</div>
				<div className={style.lowSide}>
					<motion.div variants={textAnimation} className={style.logo}>
						<Logo />
					</motion.div>
					<motion.div variants={textAnimation} className={style.info}>
						Create a workspace that epitomizes your refined preferences while
						igniting your drive for productivity.
					</motion.div>
				</div>
			</motion.div>
		</>
	)
}
export default HomeIntro
