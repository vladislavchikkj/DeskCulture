import { baseAnimation } from '@/components/animations/baseAnimation'
import { motion } from 'framer-motion'
import { FC } from 'react'

import style from './loader.module.scss'

const Loader: FC = () => {
	return (
		<motion.div
			initial='hidden'
			whileInView='visible'
			variants={baseAnimation}
			className={style.loader}
		>
			{/* <LoaderSvg /> */}
			<svg width='110' height='110' viewBox='0 0 40 60'>
				<polygon
					className={style.triangle}
					fill='none'
					stroke='#000'
					strokeWidth='1'
					points='16,1 32,32 1,32'
				/>
				<text className={style.loading} x='0' y='45' fill='#000'>
					DeskCulture
				</text>
			</svg>
		</motion.div>
	)
}

export default Loader
