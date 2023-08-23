import { NextPage } from 'next'

import { useLayout } from '@/components/context/LayoutContext'

import Footer from '@/ui/layout/footer/Footer'

import Auth from '@/screens/auth/Auth'

const AuthPage: NextPage = () => {
	const { layout, updateLayout } = useLayout()
	updateLayout(false)
	return (
		<>
			<Auth />
			<Footer />
		</>
	)
}

export default AuthPage
