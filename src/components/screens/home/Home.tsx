// import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { FC } from 'react'
import 'react-html5video/dist/styles.css'

import Meta from '@/ui/Meta'
import Layout from '@/ui/layout/Layout'

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
	return (
		<Meta title='Home'>
			<Layout>
				<section className={style.home}>
					<Parallax
						pages={4}
						style={{ top: '0', left: '0', background: 'red' }}
					>
						<ParallaxLayer offset={0} speed={0.2} style={{ zIndex: '2' }}>
							<div className={style.intro}>
								<ParallaxLayer offset={0} speed={0.5}>
									<HomeIntro />
								</ParallaxLayer>
							</div>
						</ParallaxLayer>
						<ParallaxLayer
							offset={0.55}
							speed={0.2}
							style={{ zIndex: '1', overflow: 'hidden' }}
						>
							<HomePlayer />
						</ParallaxLayer>
						<ParallaxLayer offset={1.2} speed={0.5} style={{ zIndex: '2' }}>
							<ParallaxLayer speed={-0.2} style={{ zIndex: '2' }}>
								<HomeSetup setups={setups} setupsLength={2} />
							</ParallaxLayer>
						</ParallaxLayer>
						<ParallaxLayer
							offset={2}
							speed={1}
							style={{ zIndex: '2', top: '-18%' }}
						>
							<HomeCategory categories={categories} categoriesLength={2} />
						</ParallaxLayer>
						<ParallaxLayer offset={2.3} speed={1.2} style={{ zIndex: '2' }}>
							<HomeSocial />
						</ParallaxLayer>
						<ParallaxLayer offset={3.1} speed={1} style={{ zIndex: '2' }}>
							<HomeReviews />
						</ParallaxLayer>
					</Parallax>
					{/* <Parallax pages={3.4} style={{ top: '0', left: '0' }}>
						<ParallaxLayer offset={0} speed={0.2} style={{ zIndex: '2' }}>
							<HomePlayer />
						</ParallaxLayer>
						<ParallaxLayer
							offset={0}
							speed={0.7}
							style={{ transition: '.1s', zIndex: '1' }}
						>
							<div className={style.intro}>
								<ParallaxLayer offset={0} speed={0.2}>
									<HomeIntro />
								</ParallaxLayer>
							</div>
							<ParallaxLayer offset={1.6} speed={0.1}>
								<HomeSetup setups={setups} setupsLength={2} />
							</ParallaxLayer>
							<ParallaxLayer offset={2.3} speed={0.3}>
								<HomeCategory categories={categories} categoriesLength={2} />
							</ParallaxLayer>
							<ParallaxLayer offset={2.95} speed={0.7}>
								<HomeSocial />
							</ParallaxLayer>
							<ParallaxLayer offset={3.1} speed={1}>
								<HomeReviews />
							</ParallaxLayer>
						</ParallaxLayer>
					</Parallax> */}
					<LowBar />
				</section>
			</Layout>
		</Meta>
	)
}

export default Home
