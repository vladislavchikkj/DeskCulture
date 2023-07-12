import { FC, PropsWithChildren } from 'react'

import Header from './header/Header'
import PopUp from './header/cart/Cart'
import style from './layout.module.scss'

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<>
			<Header />
			<main className={style.main}>{children}</main>
		</>
	)
}

export default Layout
