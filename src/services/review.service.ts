import { IReview } from '@/types/review.interface'

import { instance } from '@/api/api.interceptor'

const REVIEWS = 'reviews'

type TypeData = {
	rating: number
	text: string
}

export const ReviewService = {
	async getAll() {
		return instance<IReview[]>({
			url: REVIEWS,
			method: 'GET'
		})
	},
	async getAverageByProduct(productId: string | number) {
		return instance<number>({
			url: `${REVIEWS}/average-by-product/${productId}`,
			method: 'GET'
		})
	},
	async leave(productId: string | number, name: string, data: TypeData) {
		return instance<IReview>({
			url: `${REVIEWS}/leave/${productId}`,
			method: 'POST',
			data
		})
	}
}
