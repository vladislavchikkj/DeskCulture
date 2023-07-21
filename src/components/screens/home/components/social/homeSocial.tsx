import { FC } from 'react'

import Button from '@/ui/common/buttons/Button'

import style from './homesocial.module.scss'
import FacebookImg from './svg/facebook.svg'
import InstImg from './svg/instagram.svg'
import TiktokImg from './svg/tiktok.svg'

const HomeSocial: FC = () => {
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
		</>
	)
}
export default HomeSocial
