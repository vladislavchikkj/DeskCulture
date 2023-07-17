import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import Image from 'next/image'
import { FC } from 'react'
import Scrollbars from 'react-custom-scrollbars'
import 'react-html5video/dist/styles.css'
import ReactPlayer from 'react-player'

import Meta from '@/ui/Meta'
import Layout from '@/ui/layout/Layout'

import { TypePaginationProducts } from '@/types/product.interface'

import style from './home.module.scss'
import testImg from './img/test-1.png'
import Logo from './svg/logo.svg'
import LowbarBtn from './svg/lowbar.svg'

const Home: FC<TypePaginationProducts> = ({ products, length }) => {
	return (
		<Scrollbars
			thumbSize={400}
			style={{
				height: '100vh'
			}}
		>
			<Meta title='Home'>
				<Layout>
					<section className={style.home}>
						<Parallax pages={3} style={{ top: '0', left: '0' }}>
							<ParallaxLayer offset={0} speed={0.2}>
								<div className={style.video}>
									<ReactPlayer
										muted
										width={'70'}
										height={'60vw'}
										url={
											'https://player.vimeo.com/video/726622515?h=557969d636'
										}
										controls={false}
										playing={true}
									/>
								</div>
							</ParallaxLayer>
							<ParallaxLayer offset={0} speed={0.7}>
								<div className={style.homeGreyBg}>
									<ParallaxLayer offset={0} speed={0.2}>
										<div className='container-f'>
											<div className={style.title}>
												<h1>
													Create. Your.
													<span className='text-white block'>Workspace.</span>
												</h1>
											</div>
											<div className={style.lowSide}>
												<div className={style.logo}>
													<Logo />
												</div>
												<div className={style.info}>
													Create a workspace that epitomizes your refined
													preferences while igniting your drive for
													productivity.
												</div>
											</div>
										</div>
									</ParallaxLayer>
								</div>
								<ParallaxLayer offset={1.5} speed={0.1}>
									<div className={style.category}>
										<div className={`${style.setup} container-f`}>
											<div className='btnWrapper'>
												<div>See more</div>
											</div>
											<div className={style.categoryName}>
												<h2>Ready setup</h2>
												<h3>
													Upgrade your workspace with our collection of desk
													accessories! We offer a wide range of stylish and
													functional products, including organizers, pen
													holders, phone stands, desk lamps, portable chargers,
													and much more.
												</h3>
											</div>
											<div className={style.item}>
												<Image src={testImg} alt={'img'}></Image>
												<div className={style.descr}>
													<h3>White Style SetUp</h3>
													<h4>
														A white modern workstation epitomizes elegance and
														functionality. It features clean lines and
														minimalist design, with ample space and storage.
													</h4>
												</div>
											</div>
											<div className={style.item}>
												<Image src={testImg} alt={'img'}></Image>
												<h3>Warm Style SetUp</h3>
												<h4>
													A warm, modern workstation with wood tones exudes a
													cozy and inviting atmosphere. It combines sleek
													contemporary design with natural elements, creating a
													harmonious balance.
												</h4>
											</div>
										</div>
									</div>
								</ParallaxLayer>
							</ParallaxLayer>
						</Parallax>
						<div className={`${style.lowbar} container-f`}>
							<div className={style.select}>Select a ready setup</div>
							<div className={style.btn}>
								<LowbarBtn />
							</div>
						</div>
					</section>
					{/* <Catalog title='Catalog' data={{ products, length }} /> */}
				</Layout>
			</Meta>
		</Scrollbars>
	)
}

export default Home
