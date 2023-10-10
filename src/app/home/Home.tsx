'use client'

import { motion } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import 'react-html5video/dist/styles.css'
import { useInView } from 'react-intersection-observer'

import { useLayout } from '@/components/context/LayoutContext'

import Footer from '@/ui/layout/footer/Footer'

import { TypeCombinedPagination } from '@/types/product.interface'

import { baseAnimation } from '@/components/animations/baseAnimation'
import {
	homeAnimation,
	LowBarAnimation
} from '@/components/animations/homeAnimation'
import Notifications from '@/ui/common/notifications/Notifications'
import Link from 'next/link'
import { ScrollParallax } from 'react-just-parallax'
import HomeCategory from './components/category/homeCategory'
import HomeIntro from './components/intro/homeIntro'
import LowBar from './components/lowbar/homeLowbar'
import HomePlayer from './components/player/homePlayer'
import HomeReviews from './components/reviews/homeReviews'
import HomeSetup from './components/setup/homeSetup'
import HomeSocial from './components/social/homeSocial'
import style from './home.module.scss'

const Home: FC<TypeCombinedPagination> = ({ categories, setups, products }) => {
	const { ref: inViewRef, inView: inViewIntro } = useInView({
		initialInView: false,
		threshold: 0.2
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

	return (
		<>
			<motion.section
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true }}
				variants={baseAnimation}
				className={style.home}
			>
				<ScrollParallax lerpEase={0.05} zIndex={10} strength={-0.15}>
					<motion.div
						variants={homeAnimation}
						ref={inViewRef}
						className={style.intro}
					>
						<ScrollParallax lerpEase={0.05} zIndex={10} strength={-0.25}>
							<HomeIntro />
						</ScrollParallax>
					</motion.div>
				</ScrollParallax>
				<ScrollParallax lerpEase={1} zIndex={1} strength={0.25}>
					<HomePlayer />
				</ScrollParallax>
				<div id='homesetup'>
					<ScrollParallax lerpEase={0.05} zIndex={10} strength={-0.15}>
						<HomeSetup setups={setups} setupsLength={2} />
					</ScrollParallax>
				</div>
				<ScrollParallax lerpEase={0.05} zIndex={11} strength={-0.15}>
					<HomeCategory categories={categories} categoriesLength={2} />
				</ScrollParallax>
				<ScrollParallax lerpEase={0.05} zIndex={13} strength={-0.15}>
					<HomeSocial />
				</ScrollParallax>
				<ScrollParallax zIndex={13} strength={-0.15}>
					<HomeReviews products={products} />
				</ScrollParallax>
				<Footer />
				<Notifications
					isOpen={isNotificationsOpen}
					closeNotifications={handleCookiesAcceptance}
				>
					This website uses <strong className='text-greySub'>cookies</strong>
				</Notifications>
				<Link href='#homesetup'>
					<motion.div custom={1} variants={LowBarAnimation}>
						<LowBar lowbarState={inViewIntro}>Select a ready setup</LowBar>
					</motion.div>
				</Link>
			</motion.section>
		</>
	)
}

export default Home
