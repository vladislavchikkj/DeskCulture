import { FC, PropsWithChildren } from 'react'

import PopUp from '../common/cart/Cart'

import Header from './header/Header'
import style from './layout.module.scss'

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<>
			<PopUp />
			<Header />
			<main className={style.main}>{children}</main>
		</>
	)
}

export default Layout
