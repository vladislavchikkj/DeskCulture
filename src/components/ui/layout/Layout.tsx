import { FC } from 'react'
import { useInView } from 'react-intersection-observer'

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
			<main>{children}</main>
		</>
	)
}

export default Layout
