// import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { FC } from 'react'
import 'react-html5video/dist/styles.css'

import Meta from '@/ui/Meta'
import Layout from '@/ui/layout/Layout'
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
	return (
		<Meta title='Home'>
			<Layout>
				<section className={style.home}>
					<Parallax pages={4} style={{ top: '0', left: '0' }}>
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
							<LowBar>Select a ready setup</LowBar>
							<HomeSetup setups={setups} setupsLength={2} />
						</ParallaxLayer>
						<ParallaxLayer
							offset={2.2}
							speed={0.8}
							style={{ zIndex: '2', top: '-18%' }}
						>
							<LowBar>Select categories</LowBar>
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
							offset={3}
							speed={1.2}
							style={{ zIndex: '2', top: '-15%' }}
						>
							<HomeReviews />
						</ParallaxLayer>
						<ParallaxLayer style={{ zIndex: '2' }}></ParallaxLayer>
						<Footer home={true} />
					</Parallax>
					<LowBar>Select a ready setup</LowBar>
				</section>
			</Layout>
		</Meta>
	)
}

export default Home
