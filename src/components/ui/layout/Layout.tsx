import { FC } from 'react'

import TransitionEffect1 from '@/components/transitionEffects/TransitionEffect1'

import Header from './header/Header'

type Props = {
	children: React.ReactNode
	inView?: boolean
}
const Layout: FC<Props> = ({ children, inView }) => {
	return (
		<>
			<Header inView={inView} />
			<TransitionEffect1>
				<main>{children}</main>
			</TransitionEffect1>
		</>
	)
}

export default Layout
