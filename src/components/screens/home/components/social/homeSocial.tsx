import { FC, LegacyRef } from 'react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
// import required modules
import { Swiper, SwiperSlide } from 'swiper/react'

import Button from '@/ui/common/buttons/Button'

import style from './homesocial.module.scss'
import FacebookImg from './svg/facebook.svg'
import InstImg from './svg/instagram.svg'
import TiktokImg from './svg/tiktok.svg'

type HomeSocialProps = {
	socialRef?: LegacyRef<HTMLDivElement> | undefined
}

const HomeSocial: FC<HomeSocialProps> = ({ socialRef }) => {
	return (
		<>
			<div ref={socialRef} className={`${style.social} container-f`}>
				<div className={style.socialInfo}>
					<div className={style.btnWrapper}>Follow Us</div>
					<div className={style.categoryName}>
						<div className={style.socialTitle}>
							Connect with Us! Explore the World of Stylish Desk Accessories on
							Our Social Media Platforms.
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
					<div className={style.linksWrap}>
						<div className={style.linksWrapContainer}>
							<Swiper
								className={style.swiper}
								slidesPerView={2.5}
								spaceBetween={30}
								pagination={{
									clickable: true
								}}
							>
								<SwiperSlide>
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
								</SwiperSlide>
								<SwiperSlide>
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
								</SwiperSlide>
								<SwiperSlide>
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
								</SwiperSlide>
								<SwiperSlide>
									<div className={style.link}>
										<div className={style.linkImg}>
											<TiktokImg />
										</div>
										<div className={style.linkDescr}>
											<span className={style.linkName}>Another</span>
											<Button data-hover='+' variant='btnPlus'>
												+
											</Button>
										</div>
									</div>
								</SwiperSlide>
							</Swiper>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default HomeSocial
