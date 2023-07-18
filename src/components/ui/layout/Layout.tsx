import { FC, PropsWithChildren } from 'react'

import SmoothScrollContainer from '@/components/common/smoothScrollContainer/SmoothScrollContainer'

import Header from './header/Header'

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<>
			<SmoothScrollContainer>
				<Header />
				<main>{children}</main>
			</SmoothScrollContainer>
		</>
	)
}

export default Layout
