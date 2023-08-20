import { motion } from 'framer-motion'
import router from 'next/router'
import { FC } from 'react'

import Header from './header/Header'

type Props = {
	children: React.ReactNode
	inView?: boolean
}
const Layout: FC<Props> = ({ children, inView }) => {
	// const { ref: refLowBar, inView: inViewLowBar } = useInView({
	// 	threshold: 0
	// })
	return (
		<>
			<Header inView={inView} />
			<motion.div
				key={router.route}
				initial={{ y: 25, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				className='nav-bar'
				transition={{
					duration: 0.75
				}}
			>
				<main>{children}</main>
			</motion.div>
		</>
	)
}

export default Layout
