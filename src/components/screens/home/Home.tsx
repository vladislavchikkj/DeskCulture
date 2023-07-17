import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import Image from 'next/image'
import { FC } from 'react'
import Scrollbars from 'react-custom-scrollbars'
import 'react-html5video/dist/styles.css'

import Meta from '@/ui/Meta'
import Layout from '@/ui/layout/Layout'

import { TypePaginationProducts } from '@/types/product.interface'

import style from './home.module.scss'
import Logo from './svg/logo.svg'
import LowbarBtn from './svg/lowbar.svg'
import videoBg from './video/video.png'

const Home: FC<TypePaginationProducts> = ({ products, length }) => {
	return (
		<Scrollbars
			thumbSize={200}
			// autoHide
			style={{
				height: '100vh'
			}}
		>
			<Meta title='Home'>
				<Layout>
					<section className={style.home}>
						<Parallax pages={2} style={{ top: '0', left: '0' }}>
							<ParallaxLayer offset={0} speed={0.3}>
								<div className={style.video}>
									<Image
										src={videoBg} // Путь к изображению в папке public
										alt='My Image'
									/>
									{/* <ReactPlayer url='https://i.vimeocdn.com/video/1675289256-6db006c7748147413dbd61e672aa747cfa1099e641538eab7bd0fc3f9bf3f7c6-d?mw=1920&mh=1080' /> */}
								</div>
							</ParallaxLayer>
							<ParallaxLayer offset={0} speed={0.6}>
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
