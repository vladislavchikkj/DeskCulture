import { AnimatePresence, motion } from 'framer-motion'
import { FC } from 'react'

const variants = {
	in: {
		opacity: 1,
		scale: 1,
		overflow: 'auto',
		transition: {
			duration: 0.4
		}
	},
	out: {
		opacity: 0,
		scale: 1,
		overflow: 'hidden',
		transition: {
			duration: 0.4
		}
	}
}

const TransitionEffect1: FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<AnimatePresence>
			<motion.div variants={variants} animate='in' initial='out' exit='out'>
				{children}
			</motion.div>
		</AnimatePresence>
	)
}

export default TransitionEffect1
