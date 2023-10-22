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
	async create(CategoryData: any, images: File[]) {
		const formData = new FormData()
		Object.keys(CategoryData).forEach(key => {
			formData.append(key, CategoryData[key])
		})
		images.forEach(image => {
			formData.append('image', image)
		})
		return await instance({
			url: CATEGORIES,
			method: 'POST',
			data: formData
		})
	},
	async update(id: number, CategoryData: any, images: File[]) {
		const formData = new FormData()
		Object.keys(CategoryData).forEach(key => {
			formData.append(key, CategoryData[key])
		})
		images.forEach(image => {
			formData.append('image', image)
		})
		return await instance({
			url: `${CATEGORIES}/${id}`,
			method: 'PUT',
			data: formData
		})
	},
	async delete(id: string | number) {
		return instance<ICategory>({
			url: `${CATEGORIES}/${id}`,
			method: 'DELETE'
		})
	}
}
