import { ICategory } from '@/types/category.interface'

import { axiosClassic, instance } from '@/api/api.interceptor'

const CATEGORIES = 'categories'

export const CategoryService = {
	async getAll() {
		const { data } = await axiosClassic<ICategory[]>({
			url: CATEGORIES,
			method: 'GET'
		})
		return data
	},
	async getById(id: string | number) {
		return instance<ICategory>({
			url: `${CATEGORIES}/${id}`,
			method: 'GET'
		})
	},
	async getBySlug(slug: string | number) {
		return axiosClassic<ICategory>({
			url: `${CATEGORIES}/by-slug/${slug}`,
			method: 'GET'
		})
	},
	async create() {
		return instance<ICategory>({
			url: CATEGORIES,
			method: 'POST'
		})
	},
	async update(id: string | number, name: string) {
		return instance<ICategory>({
			url: `${CATEGORIES}/${id}`,
			method: 'PUT',
			data: { name }
		})
	},
	async delete(id: string | number) {
		return instance<ICategory>({
			url: `${CATEGORIES}/${id}`,
			method: 'DELETE'
		})
	}
}
