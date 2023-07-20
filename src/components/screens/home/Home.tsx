import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import Image from 'next/image'
import { FC } from 'react'
import 'react-html5video/dist/styles.css'
import ReactPlayer from 'react-player'

import Meta from '@/ui/Meta'
import Button from '@/ui/common/buttons/Button'
import Layout from '@/ui/layout/Layout'

import { TypePaginationProducts } from '@/types/product.interface'

import style from './home.module.scss'
import testImg3 from './img/category-1.png'
import testImg4 from './img/category-2.png'
import rev1 from './img/rev-1.png'
import rev2 from './img/rev-2.png'
import rev3 from './img/rev-3.png'
import testImg from './img/test-1.png'
import testImg2 from './img/test-2.png'
import FacebookImg from './svg/facebook.svg'
import InstImg from './svg/instagram.svg'
import Logo from './svg/logo.svg'
import LowbarBtn from './svg/lowbar.svg'
import TiktokImg from './svg/tiktok.svg'

const Home: FC<TypePaginationProducts> = ({ products, length }) => {
	return (
		<Meta title='Home'>
			<Layout>
				<section className={style.home}>
					<Parallax pages={4} style={{ top: '0', left: '0' }}>
						<ParallaxLayer offset={0} speed={0.2}>
							<div className={style.video}>
								<ReactPlayer
									muted
									width={'70'}
									height={'60vw'}
									url={'https://player.vimeo.com/video/726622515?h=557969d636'}
									controls={false}
									playing={true}
								/>
							</div>
						</ParallaxLayer>
						<ParallaxLayer offset={0} speed={0.7} style={{ transition: '.1s' }}>
							<div className={style.intro}>
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
												preferences while igniting your drive for productivity.
											</div>
										</div>
									</div>
								</ParallaxLayer>
							</div>
							<ParallaxLayer offset={1.6} speed={0.1 / 5}>
								<div className={style.category}>
									<div className={`${style.setup} container-f`}>
										<div className={style.btnWrapper}>
											<span className={style.numdot}>01</span>
											<Button data-hover='ready setup' variant='grey'>
												ready setup
											</Button>
										</div>
										<div className={style.categoryName}>
											<h2>Ready setup</h2>
											<h3>
												Upgrade your workspace with our collection of desk
												accessories! We offer a wide range of stylish and
												functional products, including organizers, pen holders,
												phone stands, desk lamps, portable chargers, and much
												more.
											</h3>
										</div>
										<div className={style.item}>
											<Image src={testImg2} alt={'img'}></Image>
											<div className={style.descr}>
												<h3>White Style SetUp</h3>
												<h4>
													A white modern workstation epitomizes elegance and
													functionality. It features clean lines and minimalist
													design, with ample space and storage.
												</h4>
											</div>
										</div>
										<div className={style.item}>
											<Image src={testImg} alt={'img'}></Image>
											<h3>Warm Style SetUp</h3>
											<h4>
												A warm, modern workstation with wood tones exudes a cozy
												and inviting atmosphere. It combines sleek contemporary
												design with natural elements, creating a harmonious
												balance.
											</h4>
										</div>
									</div>
								</div>
							</ParallaxLayer>
							<ParallaxLayer offset={2.3} speed={0.3}>
								<div className={style.category}>
									<div className={`${style.setup} container-f`}>
										<div className={style.btnWrapper}>
											<span className={style.numdot}>02</span>
											<Button data-hover='categories' variant='grey'>
												categories
											</Button>
										</div>
										<div className={style.categoryName}>
											<h2>Product categories</h2>
											<h3>
												Upgrade your workspace with our collection of desk
												accessories! We offer a wide range of stylish and
												functional products, including organizers, pen holders,
												phone stands, desk lamps, portable chargers, and much
												more.
											</h3>
										</div>
										<div className={style.item}>
											<Image src={testImg3} alt={'img'}></Image>
											<div className={style.descr}>
												<h3>Desk Mats</h3>
												<h4>
													Elevate your workspace with our premium mouse pads,
													designed to enhance your productivity and declutter
													your setup.
												</h4>
											</div>
										</div>
										<div className={style.item}>
											<Image src={testImg4} alt={'img'}></Image>
											<h3>Stands</h3>
											<h4>
												Ideal for crafting a versatile workstation, catering to
												laptops, smartphones, and tablets alike.
											</h4>
										</div>
									</div>
								</div>
							</ParallaxLayer>
							<ParallaxLayer offset={2.95} speed={0.7}>
								<div className={`${style.social} container-f`}>
									<div className={style.socialInfo}>
										<div className={style.btnWrapper}>Follow Us</div>
										<div className={style.categoryName}>
											<div className={style.socialTitle}>
												Connect with Us! Explore the World of Stylish Desk
												Accessories on Our Social Media Platforms.
											</div>
											<div className={style.moreBtn}>
												<Button data-hover='More About Us' variant='grey'>
													More About Us
												</Button>
											</div>
										</div>
									</div>
									<div className={style.slider}>
										<div className={style.sliderBtns}>
											<Button data-hover='←' variant='btnArrow'>
												←
											</Button>
											<Button data-hover='→' variant='btnArrow'>
												→
											</Button>
										</div>
										<div className={style.links}>
											<div className={style.link}>
												<div className={style.linkImg}>
													<InstImg />
												</div>
												<div className={style.linkDescr}>
													<span className={style.linkName}>Instagram</span>
													<Button data-hover='+' variant='btnPlus'>
														+
													</Button>
												</div>
											</div>
											<div className={style.link}>
												<div className={style.linkImg}>
													<FacebookImg />
												</div>
												<div className={style.linkDescr}>
													<span className={style.linkName}>Facebook</span>
													<Button data-hover='+' variant='btnPlus'>
														+
													</Button>
												</div>
											</div>
											<div className={style.link}>
												<div className={style.linkImg}>
													<TiktokImg />
												</div>
												<div className={style.linkDescr}>
													<span className={style.linkName}>Tiktok</span>
													<Button data-hover='+' variant='btnPlus'>
														+
													</Button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</ParallaxLayer>
						</ParallaxLayer>
						<ParallaxLayer offset={2.8} speed={2}>
							<div className={`${style.reviews}  container-f`}>
								<div className={style.reviews__header}>
									<span className={style.reviews__title}>Reviews</span>
									<Button data-hover='Read More' variant='grey'>
										Read More
									</Button>
								</div>
								<div className={style.reviews__items}>
									<div className={style.reviews__item}>
										<Image
											className={style.reviews__img}
											src={rev1}
											alt='img'
										></Image>
										<div className={style.reviews__info}>
											<div className={style.reviews__name}>Rob Stevenson</div>
											<div className={style.reviews__text}>
												This luxurious Grey Desk Mat, made from soft cloth is
												perfect for any desk setup. Give your home office a
												modern look and achieve the perfect balance of control
												and speed with this micro-textured desk pad to enhance
												your performance.
											</div>
											<div className={style.reviews__rating}>Rating</div>
											<div className={style.reviews__rating}>Etc.</div>
										</div>
									</div>
									<div className={style.reviews__item}>
										<Image
											className={style.reviews__img}
											src={rev2}
											alt='img'
										></Image>
										<div className={style.reviews__info}>
											<div className={style.reviews__name}>Rob Stevenson</div>
											<div className={style.reviews__text}>
												This luxurious Grey Desk Mat, made from soft cloth is
												perfect for any desk setup. Give your home office a
												modern look and achieve the perfect balance of control
												and speed with this micro-textured desk pad to enhance
												your performance.
											</div>
											<div className={style.reviews__rating}>Rating</div>
											<div className={style.reviews__rating}>Etc.</div>
										</div>
									</div>
									<div className={style.reviews__item}>
										<Image
											className={style.reviews__img}
											src={rev3}
											alt='img'
										></Image>
										<div className={style.reviews__info}>
											<div className={style.reviews__name}>Rob Stevenson</div>
											<div className={style.reviews__text}>
												This luxurious Grey Desk Mat, made from soft cloth is
												perfect for any desk setup. Give your home office a
												modern look and achieve the perfect balance of control
												and speed with this micro-textured desk pad to enhance
												your performance.
											</div>
											<div className={style.reviews__rating}>Rating</div>
											<div className={style.reviews__rating}>Etc.</div>
										</div>
									</div>
								</div>
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
	)
}

export default Home
