import { FC, useState } from 'react'
import { Rating } from 'react-simple-star-rating'

import { IProduct } from '@/types/product.interface'

const ProductRating: FC<{ product: IProduct }> = ({ product }) => {
	const [rating, setRating] = useState<number>(
		Math.round(
			product.reviews.reduce((acc, review) => acc + review.rating, 0) /
				product.reviews.length
		) || 0
	)
	return (
		<div>
			<span>Review:</span>
			<span>
				<Rating
					readonly
					initialValue={rating}
					SVGstyle={{
						display: 'inline-block'
					}}
					size={25}
					allowFraction
					transition
				/>
				<span className='text-secondary'>{rating}</span>
			</span>
			<span className='text-secondary'>({product.reviews.length} reviews)</span>
		</div>
	)
}

export default ProductRating
