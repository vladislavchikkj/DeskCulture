import { NextPage } from 'next'

import Footer from '@/ui/layout/footer/Footer'

import Auth from '@/screens/auth/Auth'

const AuthPage: NextPage = () => {
	return (
		<>
			<Auth />
			<Footer />
		</>
	)
}

export default AuthPage
