import { FC } from 'react'
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

const HomeSocial: FC = () => {
	// const [isDragging, setIsDragging] = useState(false)
	// const [startX, setStartX] = useState(0)
	// const [offsetX, setOffsetX] = useState(0)
	// const scrollRef = useRef<HTMLDivElement>(null)

	// const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
	// 	setIsDragging(true)
	// 	setStartX(event.clientX)
	// }

	// const handleMouseMove = (event: MouseEvent) => {
	// 	if (!isDragging) return
	// 	const newOffsetX = Math.min(
	// 		0,
	// 		Math.max(-1000, event.clientX - startX + offsetX) // Ограничиваем прокрутку до -100vw и 0vw
	// 	)
	// 	setOffsetX(newOffsetX)
	// }
	// const handleMouseUp = () => {
	// 	setIsDragging(false)
	// }

	// useEffect(() => {
	// 	if (isDragging) {
	// 		document.addEventListener('mousemove', handleMouseMove)
	// 	} else {
	// 		document.removeEventListener('mousemove', handleMouseMove)
	// 	}

	// 	return () => {
	// 		document.removeEventListener('mousemove', handleMouseMove)
	// 	}
	// }, [isDragging])

	return (
		<>
			<div className={`${style.social} container-f`}>
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
						{/* <div className={style.linksWrapContainer}>
							<div className={style.linksWrapScroll}> */}

						<Swiper className='mySwiper'>
							<div className={style.links}>
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
									{' '}
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
							</div>
						</Swiper>
					</div>
				</div>
			</div>
			{/* </div>
			</div> */}
		</>
	)
}

export default HomeSocial
