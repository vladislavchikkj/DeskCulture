import { serverAddress, shimmer, toBase64 } from '@/components/common'
import useCustomMediaQuery from '@/hooks/useCustomMediaQuery'
import { IReview } from '@/types/review.interface'
import Image from 'next/image'
import { FC } from 'react'
import { Rating } from 'react-simple-star-rating'
import style from './reviews.module.scss'
const ReviewItem: FC<{ review: IReview }> = ({ review }) => {
	const device = useCustomMediaQuery()

	const createdAt = review.createdAt
	const dateObject = new Date(createdAt)
	const formattedDate = dateObject.toISOString().split('T')[0]
	const formattedTime = dateObject.toISOString().split('T')[1].slice(0, 8)
	if (device === null) {
		// Если тип устройства еще не определен, можно вернуть загрузчик или пустой div.
		return <div>Loading...</div>
	}
	return (
		<div className={style.reviewWrapper}>
			<div className={style.reviewInfo}>
				{review.imageUrl && (
					<div className={style.reviewImg}>
						<Image
							width={500}
							height={500}
							src={`${serverAddress}/${review.imageUrl}`}
							alt={String(review.productId)}
							placeholder={`data:image/svg+xml;base64,${toBase64(
								shimmer(700, 475)
							)}`}
							style={{
								maxWidth: '100%',
								height: 'auto'
							}}
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
