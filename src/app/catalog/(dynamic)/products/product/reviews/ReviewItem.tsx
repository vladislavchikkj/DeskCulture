import { IReview } from '@/types/review.interface'
import { FC } from 'react'
import { Rating } from 'react-simple-star-rating'
import style from './reviews.module.scss'

const ReviewItem: FC<{ review: IReview }> = ({ review }) => {
	return (
		<div className={style.reviewWrapper}>
			<div>
				<div className={style.userName}>
					<span>{review.user.name}</span>
				</div>
				<Rating
					readonly
					initialValue={review.rating}
					SVGstyle={{ display: 'inline-block' }}
					size={20}
					allowFraction
					transition
				/>
			</div>
			<div className={style.reviewText}>{review.text}</div>
		</div>
	)
}
export default ReviewItem
