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

{
	/* <motion.section
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true }}
				variants={baseAnimation}
				className={style.home}
			>
				<Parallax ref={parallax} pages={4.2} style={{ top: '0', left: '0' }}>
					<ParallaxLayer offset={0} speed={0.2} style={{ zIndex: '5' }}>
						<motion.div
							variants={homeAnimation}
							ref={inViewRef}
							className={style.intro}
						>
							<ParallaxLayer offset={0} speed={0.5}>
								<HomeIntro />
							</ParallaxLayer>
						</motion.div>
					</ParallaxLayer>
					<ParallaxLayer
						offset={0.55}
						speed={0.1}
						style={{ zIndex: '1', overflow: 'hidden' }}
					>
						<HomePlayer />
					</ParallaxLayer>
					<ParallaxLayer offset={1.2} speed={0.5} style={{ zIndex: '2' }}>
						<span id='homesetup'>
							<HomeSetup setups={setups} setupsLength={2} />
						</span>
					</ParallaxLayer>
					<ParallaxLayer
						offset={2.2}
						speed={0.8}
						style={{ zIndex: '2', top: '-18%' }}
					>
						<HomeCategory categories={categories} categoriesLength={2} />
					</ParallaxLayer>
					<ParallaxLayer
						offset={2.5}
						speed={1}
						factor={1.2}
						style={{ zIndex: '2' }}
					>
						<HomeSocial />
					</ParallaxLayer>
					<ParallaxLayer
						offset={3}
						speed={1.4}
						style={{
							zIndex: '2',
							top: '-5%',
							height: '20%'
						}}
					>
						<HomeReviews products={products} />
					</ParallaxLayer>
					<ParallaxLayer offset={3.2}>
						<Footer home={true} />
					</ParallaxLayer>
					<ParallaxLayer
						className={!inViewIntro ? `${style.lowbar}` : ''}
						sticky={{ start: 0, end: 4 }}
						style={{ ...alignEnd }}
					>
						<Notifications
							isOpen={isNotificationsOpen}
							closeNotifications={handleCookiesAcceptance}
						>
							This website uses{' '}
							<strong className='text-greySub'>cookies</strong>
						</Notifications>
						<motion.div
							custom={1}
							variants={LowBarAnimation}
							onClick={() => parallax.current?.scrollTo(1.17)}
						>
							<LowBar lowbarState={inViewIntro}>Select a ready setup</LowBar>
						</motion.div>
					</ParallaxLayer>
				</Parallax>
			</motion.section> */
}
