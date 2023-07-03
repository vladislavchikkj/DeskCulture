import { FC, useState } from 'react'
import { Rating } from 'react-simple-star-rating'

import { IProduct } from '@/types/product.interface'

import ratingStyle from './productRating.module.scss'

const ProductRating: FC<{ product: IProduct }> = ({ product }) => {
	const [rating, setRating] = useState<number>(
		Math.round(
			product.reviews.reduce((acc, review) => acc + review.rating, 0) /
				product.reviews.length
		) || 0
	)
	return (
		<div>
			<div>
				<span className={ratingStyle.rating}>Review:</span>
				<span>
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
			</div>
			<span className={ratingStyle.grade}>
				{rating}({product.reviews.length} reviews)
			</span>
		</div>
	)
}

export default ProductRating
