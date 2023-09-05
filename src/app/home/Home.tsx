'use client'

import { IParallax, Parallax, ParallaxLayer } from '@react-spring/parallax'
import { motion } from 'framer-motion'
import { FC, useEffect, useRef } from 'react'
import 'react-html5video/dist/styles.css'
import { useInView } from 'react-intersection-observer'

import { useLayout } from '@/components/context/LayoutContext'

import Footer from '@/ui/layout/footer/Footer'

import { TypeCombinedPagination } from '@/types/product.interface'

import HomeCategory from './components/category/homeCategory'
import HomeIntro from './components/intro/homeIntro'
import LowBar from './components/lowbar/homeLowbar'
import HomePlayer from './components/player/homePlayer'
import HomeReviews from './components/reviews/homeReviews'
import HomeSetup from './components/setup/homeSetup'
import HomeSocial from './components/social/homeSocial'
import style from './home.module.scss'

const Home: FC<TypeCombinedPagination> = ({
	categories,
	categoriesLength,
	setups,
	setupsLength
}) => {
	const { ref: inViewRef, inView: inViewIntro } = useInView({
		initialInView: false,
		threshold: 0.2
	})
	const parallax = useRef<IParallax>(null)
	const alignEnd = { display: 'flex', alignItems: 'flex-end' }
	const Animation = {
		hidden: {
			height: '100vh'
		},
		visible: (custom: number) => ({
			height: '70vh',
			transition: { duration: 0.9, delay: custom * 0.1 }
		})
	}
	const LowBarAnimation = {
		hidden: {
			y: 300
		},
		visible: (custom: number) => ({
			y: 0,
			transition: { duration: 0.9, delay: custom * 0.2 }
		})
	}

	// Получаем функцию обновления layout из контекста
	const { layout, updateLayout } = useLayout()
	// Обновляем test, если inViewIntro истинно
	useEffect(() => {
		updateLayout(!inViewIntro ? false : true)
	}, [inViewIntro])

	return (
		<motion.section
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			className={style.home}
		>
			<Parallax ref={parallax} pages={4.2} style={{ top: '0', left: '0' }}>
				<ParallaxLayer offset={0} speed={0.2} style={{ zIndex: '5' }}>
					<motion.div
						variants={Animation}
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
					<HomeReviews />
				</ParallaxLayer>
				<ParallaxLayer sticky={{ start: 3.2, end: 4.2 }}>
					<Footer home={true} />
				</ParallaxLayer>
				<ParallaxLayer
					className={!inViewIntro ? `${style.lowbar}` : ''}
					sticky={{ start: 0, end: 4 }}
					style={{ ...alignEnd }}
				>
					<motion.div
						custom={1}
						variants={LowBarAnimation}
						onClick={() => parallax.current?.scrollTo(1.17)}
					>
						<LowBar lowbarState={inViewIntro}>Select a ready setup</LowBar>
					</motion.div>
				</ParallaxLayer>
			</Parallax>
		</motion.section>
	)
}

export default Home
