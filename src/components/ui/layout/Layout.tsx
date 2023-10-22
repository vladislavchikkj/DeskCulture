import { FC, useEffect } from 'react'

import { useLayout } from '@/components/context/LayoutContext'
import TransitionEffect1 from '@/components/transitionEffects/TransitionEffect1'

import Header from './header/Header'

type Props = {
	children: React.ReactNode
}
const Layout: FC<Props> = ({ children }) => {
	const { layout, updateLayout } = useLayout()
	useEffect(() => {
		updateLayout(false)
	}, [])

	return (
		<>
			<Header inView={layout} />
			<main>
				<TransitionEffect1>{children}</TransitionEffect1>
			</main>
		</>
	)
}

export default Layout
