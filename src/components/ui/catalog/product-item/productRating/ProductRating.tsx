import { FC, useState } from 'react'
import { Rating } from 'react-simple-star-rating'

import { IProduct } from '@/types/product.interface'

import style from './productRating.module.scss'

const ProductRating: FC<{ product: IProduct }> = ({ product }) => {
	const [rating, setRating] = useState<number>(
		Math.round(
			product.reviews.reduce((acc, review) => acc + review.rating, 0) /
				product.reviews.length
		) || 0
	)
	return (
		<div className={style.ratingWrapper}>
			<div className={style.starPos}>
				{!!product.reviews.length && (
					<>
						<span className={style.star}>
							<Rating
								readonly
								initialValue={rating}
								SVGstyle={{
									display: 'inline-block'
								}}
								size={15}
								allowFraction
								transition
							/>
						</span>
						<span className={style.grade}>{rating}</span>
					</>
				)}
			</div>
		</div>
	)
}

export default ProductRating
