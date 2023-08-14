import { NextPage } from 'next'

import Footer from '@/ui/layout/footer/Footer'
import Header from '@/ui/layout/header/Header'

import Auth from '@/screens/auth/Auth'

const AuthPage: NextPage = () => {
	return (
		<>
			<Header inView={false} />
			<Auth />
			<Footer />
		</>
	)
}

export default AuthPage
