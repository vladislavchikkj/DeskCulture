import { useAuth } from '@/hooks/useAuth'
import { IReview } from '@/types/review.interface'
import Modal from '@/ui/common/modal/Modal'
import { useState } from 'react'
import LeaveReviewForm from './LeaveReviewForm'
import ReviewItem from './ReviewItem'

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

	return (
		<section id='reviews' className=''>
			<div>
				Reviews:
				{user && (
					<button onClick={() => setModalOpen(true)}>Leave a review</button>
				)}
			</div>

			{user && (
				<Modal isOpen={isModalOpen} closeModal={() => setModalOpen(false)}>
					<LeaveReviewForm productId={productId} />
				</Modal>
			)}

			<div className=''>
				{reviews.map(review => (
					<ReviewItem key={review.id} review={review} />
				))}
				отзывы
			</div>
		</section>
	)
}
