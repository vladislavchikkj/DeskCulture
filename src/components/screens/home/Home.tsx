import { IParallax, Parallax, ParallaxLayer } from '@react-spring/parallax'
import { motion } from 'framer-motion'
import { FC, useRef } from 'react'
import 'react-html5video/dist/styles.css'
import { useInView } from 'react-intersection-observer'

import Meta from '@/ui/Meta'
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
	const {
		ref: inViewRef,
		inView: inViewIntro,
		entry
	} = useInView({
		initialInView: false,
		threshold: 0.2
	})
	const parallax = useRef<IParallax>(null)
	const alignEnd = { display: 'flex', alignItems: 'flex-end' }
	const textAnimation = {
		hidden: {
			y: -100,
			opacity: 0
		},
		visible: {
			y: 0,
			opacity: 1
		}
	}
	return (
		<Meta title='Home'>
			<motion.section
				initial='hidden'
				whileInView='visible'
				className={style.home}
			>
				<Parallax ref={parallax} pages={4} style={{ top: '0', left: '0' }}>
					<ParallaxLayer offset={0} speed={0.2} style={{ zIndex: '5' }}>
						<motion.div
							variants={textAnimation}
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
						<LowBar>Select a ready setup</LowBar>
						<HomeCategory categories={categories} categoriesLength={2} />
					</ParallaxLayer>
					<ParallaxLayer
						offset={2.5}
						speed={1}
						factor={1.2}
						style={{ zIndex: '2', top: '-2%' }}
					>
						<HomeSocial />
					</ParallaxLayer>
					<ParallaxLayer
						offset={3.1}
						speed={1.4}
						style={{
							zIndex: '2',
							top: '-12%',
							height: '20%'
						}}
					>
						<HomeReviews />
					</ParallaxLayer>
					<ParallaxLayer style={{ zIndex: '2' }}></ParallaxLayer>
					<Footer home={true} />
					<ParallaxLayer
						className={!inViewIntro ? `${style.lowbar}` : ''}
						sticky={{ start: 0, end: 4 }}
						style={{ ...alignEnd }}
					>
						<div onClick={() => parallax.current?.scrollTo(1.17)}>
							<LowBar lowbarState={inViewIntro}>Select a ready setup</LowBar>
						</div>
					</ParallaxLayer>
				</Parallax>
			</motion.section>
		</Meta>
	)
}

export default Home
