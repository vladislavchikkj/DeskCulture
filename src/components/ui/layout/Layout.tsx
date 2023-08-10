import { FC, PropsWithChildren } from 'react'

import Footer from './footer/Footer'
import Header from './header/Header'

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<>
			<Header />
			<main>{children}</main>
		</>
	)
}

export default Layout
