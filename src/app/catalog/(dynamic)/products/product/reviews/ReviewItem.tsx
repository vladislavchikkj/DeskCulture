import { IReview } from '@/types/review.interface'
import Image from 'next/image'
import { FC } from 'react'
import { Rating } from 'react-simple-star-rating'

const ReviewItem: FC<{ review: IReview }> = ({ review }) => {
	return (
		<div>
			<div>
				<Image
					alt={review.user.name}
					src={'http://localhost:4200/uploads/default-avatar.png'}
					width={40}
					height={40}
					className=''
				/>
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
			<div>{review.text}</div>
		</div>
	)
}
export default ReviewItem
