import { FC, LegacyRef, useEffect, useState } from 'react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'

// import required modules
import Button from '@/ui/common/buttons/Button'

import useCustomMediaQuery from '@/hooks/useCustomMediaQuery'
import Link from 'next/link'
import style from './homesocial.module.scss'
import FacebookImg from './svg/facebook.svg'
import InstImg from './svg/instagram.svg'
import Pinterest from './svg/pinterest.svg'
import TiktokImg from './svg/tiktok.svg'

type HomeSocialProps = {
	socialRef?: LegacyRef<HTMLDivElement> | undefined
}

const HomeSocial: FC<HomeSocialProps> = ({ socialRef }) => {
	const device = useCustomMediaQuery()

	const [slidesPerView, setSlidesPerView] = useState(3)

	useEffect(() => {
		switch (device) {
			case 'laptop':
				setSlidesPerView(2)
				break
			case 'tablet':
				setSlidesPerView(2)
				break
			case 'mobile_m':
				setSlidesPerView(1)
				break
			case 'mobile_s':
				setSlidesPerView(1)
				break
			default:
				setSlidesPerView(3) // default to 3 for desktop and larger devices
		}
	}, [device])

	if (device === null) {
		// Если тип устройства еще не определен, можно вернуть загрузчик или пустой div.
		return <div>Loading...</div>
	}
	return (
		<>
			<div ref={socialRef} className={`container-f ${style.social} `}>
				<div className={style.socialInfo}>
					<div className={style.btnWrapper}>Follow Us</div>
					<div className={style.categoryName}>
						<div className={style.socialTitle}>
							Connect with Us! Explore the World of Stylish Desk Accessories on
							Our Social Media Platforms.
						</div>
						<div className={style.moreBtn}>
							<Link href={'/contacts'}>
								<Button data-hover='More About Us' variant='grey'>
									More About Us
								</Button>
							</Link>
						</div>
					</div>
				</div>
				<div className={style.slider}>
					<div className={style.linksWrap}>
						<div className={style.linksWrapContainer}>
							<Swiper
								className={style.swiper}
								// @ts-ignore
								slidesPerView={slidesPerView}
								spaceBetween={30}
								pagination={{
									clickable: true
								}}
							>
								<SwiperSlide>
									<Link href={'https://www.instagram.com/'} target='_blank'>
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
									</Link>
								</SwiperSlide>
								<SwiperSlide>
									<Link href={'https://www.facebook.com/'} target='_blank'>
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
									</Link>
								</SwiperSlide>
								<SwiperSlide>
									<Link href={'https://www.tiktok.com/'} target='_blank'>
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
									</Link>
								</SwiperSlide>
								<SwiperSlide>
									<Link href={'https://www.pinterest.com/'} target='_blank'>
										<div className={style.link}>
											<div className={style.linkImg}>
												<Pinterest />
											</div>
											<div className={style.linkDescr}>
												<span className={style.linkName}>Pinterest</span>
												<Button data-hover='+' variant='btnPlus'>
													+
												</Button>
											</div>
										</div>
									</Link>
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
