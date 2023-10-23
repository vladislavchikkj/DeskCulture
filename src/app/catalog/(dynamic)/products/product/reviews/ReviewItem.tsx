import { serverAddress } from '@/components/common'
import useCustomMediaQuery from '@/hooks/useCustomMediaQuery'
import { IReview } from '@/types/review.interface'
import { FC } from 'react'
import { Rating } from 'react-simple-star-rating'
import style from './reviews.module.scss'
const ReviewItem: FC<{ review: IReview }> = ({ review }) => {
	const device = useCustomMediaQuery()

	if (device === null) {
		// Если тип устройства еще не определен, можно вернуть загрузчик или пустой div.
		return <div>Loading...</div>
	}
	const createdAt = review.createdAt
	const dateObject = new Date(createdAt)
	const formattedDate = dateObject.toISOString().split('T')[0]
	const formattedTime = dateObject.toISOString().split('T')[1].slice(0, 8)

	return (
		<div className={style.reviewWrapper}>
			<div className={style.reviewInfo}>
				{review.imageUrl && (
					<div className={style.reviewImg}>
						<img
							src={`${serverAddress}/${review.imageUrl}`}
							alt={String(review.productId)}
						/>
					</div>
				)}
				<div className='p-5'>
					<div className={style.userName}>
						<div>
							<span>{review.user?.name}</span>
							<div className={style.data}>
								<span className={style.data}>{formattedDate}</span>
							</div>
						</div>
						<Rating
							readonly
							initialValue={review.rating}
							SVGstyle={{ display: 'inline-block' }}
							size={
								device === 'tablet' ||
								device === 'mobile_m' ||
								device === 'mobile_s'
									? 15
									: 20
							}
							allowFraction
							transition
							fillColor={'black'}
						/>
					</div>
					<div className={style.reviewText}>{review.text}</div>
				</div>
			</div>
		</div>
	)
}
export default ReviewItem
