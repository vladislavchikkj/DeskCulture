import Image from 'next/image'
import { FC } from 'react'

import Button from '@/ui/common/buttons/Button'

import style from './homereviews.module.scss'
import rev1 from './img/rev-1.png'
import rev2 from './img/rev-2.png'
import rev3 from './img/rev-3.png'

const HomeReviews: FC = () => {
	return (
		<>
			<div className={`${style.reviews}  container-f`}>
				<div className={style.reviews__header}>
					<span className={style.reviews__title}>Reviews</span>
					<Button data-hover='Read More' variant='grey'>
						Read More
					</Button>
				</div>
				<div className={style.reviews__items}>
					<div className={style.reviews__item}>
						<Image className={style.reviews__img} src={rev1} alt='img'></Image>
						<div className={style.reviews__info}>
							<div className={style.reviews__name}>Rob Stevenson</div>
							<div className={style.reviews__text}>
								This luxurious Grey Desk Mat, made from soft cloth is perfect
								for any desk setup. Give your home office a modern look and
								achieve the perfect balance of control and speed with this
								micro-textured desk pad to enhance your performance.
							</div>
							<div className={style.reviews__rating}>Rating</div>
							<div className={style.reviews__rating}>Etc.</div>
						</div>
					</div>
					<div className={style.reviews__item}>
						<Image className={style.reviews__img} src={rev2} alt='img'></Image>
						<div className={style.reviews__info}>
							<div className={style.reviews__name}>Rob Stevenson</div>
							<div className={style.reviews__text}>
								This luxurious Grey Desk Mat, made from soft cloth is perfect
								for any desk setup. Give your home office a modern look and
								achieve the perfect balance of control and speed with this
								micro-textured desk pad to enhance your performance.
							</div>
							<div className={style.reviews__rating}>Rating</div>
							<div className={style.reviews__rating}>Etc.</div>
						</div>
					</div>
					<div className={style.reviews__item}>
						<Image className={style.reviews__img} src={rev3} alt='img'></Image>
						<div className={style.reviews__info}>
							<div className={style.reviews__name}>Rob Stevenson</div>
							<div className={style.reviews__text}>
								This luxurious Grey Desk Mat, made from soft cloth is perfect
								for any desk setup. Give your home office a modern look and
								achieve the perfect balance of control and speed with this
								micro-textured desk pad to enhance your performance.
							</div>
							<div className={style.reviews__rating}>Rating</div>
							<div className={style.reviews__rating}>Etc.</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default HomeReviews
