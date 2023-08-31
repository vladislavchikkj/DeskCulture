'use client'
import { FC } from 'react'

import { useLayout } from '@/components/context/LayoutContext'
import TransitionEffect1 from '@/components/transitionEffects/TransitionEffect1'

import Header from './header/Header'

type Props = {
	children: React.ReactNode
}
const Layout: FC<Props> = ({ children }) => {
	const { layout, updateLayout } = useLayout()
	updateLayout(false)
	return (
		<>
			<Header inView={layout} />
			<TransitionEffect1>
				<main>{children}</main>
			</TransitionEffect1>
		</>
	)
}

export default Layout
