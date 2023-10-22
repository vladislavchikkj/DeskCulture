import { useAuth } from '@/hooks/useAuth'
import useCustomMediaQuery from '@/hooks/useCustomMediaQuery'
import { IReview } from '@/types/review.interface'
import Button from '@/ui/common/buttons/Button'
import Modal from '@/ui/common/modal/Modal'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import LeaveReviewForm from './LeaveReviewForm'
import ReviewItem from './ReviewItem'
import style from './reviews.module.scss'

interface IProductReviews {
	reviews: IReview[]
	productId: number
}

export default function ProductReviews({
	reviews,
	productId
}: IProductReviews) {
	const device = useCustomMediaQuery()
	const [slidesPerView, setSlidesPerView] = useState(3)
	const [spaceBetween, setSpaceBetween] = useState(30)
	const [isModalOpen, setModalOpen] = useState(false)
	const { user } = useAuth()
	const [reviewsList, setReviewsList] = useState(reviews)

	const handleNewReview = (review: IReview) => {
		setReviewsList([review, ...reviewsList])
	}

	useEffect(() => {
		switch (device) {
			case 'laptop':
				setSlidesPerView(2)
				break
			case 'tablet':
				setSlidesPerView(2)
				setSpaceBetween(150)
				break
			case 'mobile_m':
				setSlidesPerView(2)
				setSpaceBetween(100)
				break
			case 'mobile_s':
				setSlidesPerView(2)
				setSpaceBetween(100)
				break
			default:
				setSpaceBetween(30)
				setSlidesPerView(3) // default to 3 for desktop and larger devices
		}
	}, [device])
	return (
		<section id='reviews' className=''>
			{user && (
				<Modal isOpen={isModalOpen} closeModal={() => setModalOpen(false)}>
					<LeaveReviewForm productId={productId} onSuccess={handleNewReview} />
				</Modal>
			)}

			<div className={style.reviews}>
				{reviewsList.length > 0 ? (
					<Swiper
						key={reviewsList.length}
						// @ts-ignore
						slidesPerView={slidesPerView}
						spaceBetween={spaceBetween}
						pagination={{
							clickable: true
						}}
						className={style.swiper}
					>
						{reviewsList.map(review => (
							<SwiperSlide key={review.id}>
								<ReviewItem review={review} />
							</SwiperSlide>
						))}
					</Swiper>
				) : (
					<div>Leave the first review.</div>
				)}
			</div>
			<div className={style.leaveBtn}>
				{user && (
					<Button onClick={() => setModalOpen(true)} variant={'black'}>
						Leave a review
					</Button>
				)}
			</div>
		</section>
	)
}
