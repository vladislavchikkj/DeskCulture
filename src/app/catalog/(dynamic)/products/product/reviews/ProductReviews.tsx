import { useAuth } from '@/hooks/useAuth'
import { IReview } from '@/types/review.interface'
import Button from '@/ui/common/buttons/Button'
import Modal from '@/ui/common/modal/Modal'
import { useState } from 'react'
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
	const [isModalOpen, setModalOpen] = useState(false)
	const { user } = useAuth()
	const [reviewsList, setReviewsList] = useState(reviews)

	const handleNewReview = (review: IReview) => {
		setReviewsList([review, ...reviewsList])
	}
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
						slidesPerView={3}
						spaceBetween={30}
						className={style.swiper}
					>
						{reviewsList.map(review => (
							<SwiperSlide className='flex' key={review.id}>
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
