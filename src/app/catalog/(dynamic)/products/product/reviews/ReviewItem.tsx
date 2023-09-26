import { IReview } from '@/types/review.interface'
import { FC } from 'react'
import { Rating } from 'react-simple-star-rating'
import style from './reviews.module.scss'

const ReviewItem: FC<{ review: IReview }> = ({ review }) => {
	const createdAt = review.createdAt
	const dateObject = new Date(createdAt)
	const formattedDate = dateObject.toISOString().split('T')[0]
	const formattedTime = dateObject.toISOString().split('T')[1].slice(0, 8)

	return (
		<div className={style.reviewWrapper}>
			{review.imageUrl && (
				<div className={style.reviewImg}>
					<img src={review.imageUrl} alt={String(review.productId)} />
				</div>
			)}
			<div className={style.reviewInfo}>
				<div className={style.userName}>
					<div>
						<span>{review.user?.name}</span>
						<div className='flex pt-2'>
							<span className={style.data}>{formattedDate}</span>
							<span className={style.data}>{formattedTime}</span>
						</div>
					</div>
					<Rating
						readonly
						initialValue={review.rating}
						SVGstyle={{ display: 'inline-block' }}
						size={20}
						allowFraction
						transition
						fillColor={'black'}
					/>
				</div>
				<div className={style.reviewText}>{review.text}</div>
			</div>
		</div>
	)
}
export default ReviewItem
