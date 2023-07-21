import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { FC } from 'react'
import 'react-html5video/dist/styles.css'

import Meta from '@/ui/Meta'
import Layout from '@/ui/layout/Layout'

import { TypePaginationProducts } from '@/types/product.interface'

import HomeCategory from './components/category/homeCategory'
import HomeIntro from './components/intro/homeIntro'
import LowBar from './components/lowbar/homeLowbar'
import HomePlayer from './components/player/homePlayer'
import HomeReviews from './components/reviews/homeReviews'
import HomeSetup from './components/setup/homeSetup'
import HomeSocial from './components/social/homeSocial'
import style from './home.module.scss'

const Home: FC<TypePaginationProducts> = ({ products, length }) => {
	return (
		<Meta title='Home'>
			<Layout>
				<section className={style.home}>
					<Parallax pages={4} style={{ top: '0', left: '0' }}>
						<ParallaxLayer offset={0} speed={0.2}>
							<HomePlayer />
						</ParallaxLayer>
						<ParallaxLayer offset={0} speed={0.7} style={{ transition: '.1s' }}>
							<div className={style.intro}>
								<ParallaxLayer offset={0} speed={0.2}>
									<HomeIntro />
								</ParallaxLayer>
							</div>
							<ParallaxLayer offset={1.6} speed={0.1 / 5}>
								<HomeSetup />
							</ParallaxLayer>
							<ParallaxLayer offset={2.3} speed={0.3}>
								<HomeCategory />
							</ParallaxLayer>
							<ParallaxLayer offset={2.95} speed={0.7}>
								<HomeSocial />
							</ParallaxLayer>
						</ParallaxLayer>
						<ParallaxLayer offset={2.8} speed={2}>
							<HomeReviews />
						</ParallaxLayer>
					</Parallax>
					<LowBar />
				</section>

				{/* <Catalog title='Catalog' data={{ products, length }} /> */}
			</Layout>
		</Meta>
	)
}

export default Home
