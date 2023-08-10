import { FC } from 'react'

import Header from './header/Header'

type Props = {
	children: React.ReactNode
	inView: boolean
}
const Layout: FC<Props> = ({ children, inView }) => {
	return (
		<>
			<Header inView={inView} />
			<main>{children}</main>
		</>
	)
}

export default Layout
