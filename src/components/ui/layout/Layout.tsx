import { animated, useScroll } from '@react-spring/web'
import { FC } from 'react'

import TransitionEffect1 from '@/components/transitionEffects/TransitionEffect1'

import Header from './header/Header'

type Props = {
	children: React.ReactNode
	inView?: boolean
}
const Layout: FC<Props> = ({ children, inView }) => {
	const { scrollYProgress } = useScroll()
	return (
		<>
			<animated.div style={{ opacity: scrollYProgress }}>
				<Header inView={inView} />
			</animated.div>
			<TransitionEffect1>
				<main>{children}</main>
			</TransitionEffect1>
		</>
	)
}

export default Layout
