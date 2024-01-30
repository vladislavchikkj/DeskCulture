'use client' // indicates Client Component

import { motion } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import 'react-html5video/dist/styles.css'
import { useInView } from 'react-intersection-observer'

import { useLayout } from '@/components/context/LayoutContext'

import { TypeCombinedPagination } from '@/types/product.interface'

import { baseAnimation } from '@/components/animations/baseAnimation'
import useCustomMediaQuery from '@/hooks/useCustomMediaQuery'
import Notifications from '@/ui/common/notifications/Notifications'
import Footer from '@/ui/layout/footer/Footer'
import BestSellers from './components/bestSellers/bestSellers'
import HomeSetup from './components/setup/homeSetup'
import HomeSocial from './components/social/homeSocial'
import style from './home.module.scss'
import HomeCategories from './new_components/homeCatalog/homeCategories'
import Intro from './new_components/intro/Intro'
import Keycaps from './new_components/keycaps/keycaps'

const Home: FC<TypeCombinedPagination> = ({ categories, setups, products }) => {
	const { ref: inViewRef, inView: inViewIntro } = useInView({
		threshold: 0
	})
	const { ref: inViewPageRef, inView: inViewPage } = useInView({
		threshold: 0
	})
	const { updateLayout } = useLayout()
	useEffect(() => {
		updateLayout(!inViewIntro ? false : true)
	}, [inViewIntro])
	const [isNotificationsOpen, setNotificationsOpen] = useState(false)

	useEffect(() => {
		const isCookieNotificationSaved = localStorage.getItem('cookieNotification')
		if (!isCookieNotificationSaved) {
			setNotificationsOpen(true)
		}
	}, [])

	const handleCookiesAcceptance = () => {
		localStorage.setItem('cookieNotification', 'accepted')

		setNotificationsOpen(false)
	}
	const device = useCustomMediaQuery()
	if (device === null) {
		return <div>Loading...</div>
	}
	return (
		<>
			<motion.section
				initial='hidden'
				whileInView='visible'
				variants={baseAnimation}
				className={style.home}
			>
				<Intro />
				<HomeCategories categories={categories} />
				<BestSellers products={products} />
				<Keycaps products={products} />
				<HomeSetup setups={setups} />
				<HomeSocial />
				<Footer />
				<Notifications
					isOpen={isNotificationsOpen}
					closeNotifications={handleCookiesAcceptance}
				>
					This website uses <strong className='text-greySub'>cookies</strong>
				</Notifications>
			</motion.section>
		</>
	)
}

export default Home
