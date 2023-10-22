import { ISetups } from '@/types/setups.interface'

import { axiosClassic, instance } from '@/api/api.interceptor'
import { IProduct } from '@/types/product.interface'

const SETUPS = 'setups'

export const SetupsService = {
	async getAll() {
		const { data } = await axiosClassic<ISetups[]>({
			url: SETUPS,
			method: 'GET'
		})
		return data
	},
	async getById(id: string | number) {
		return instance<ISetups>({
			url: `${SETUPS}/${id}`,
			method: 'GET'
		})
	},
	async getBySetups(id: string | number) {
		return instance<IProduct[]>({
			url: `${SETUPS}/${id}/products`,
			method: 'GET'
		})
	},
	async create(SetupData: any, images: File[]) {
		const formData = new FormData()
		Object.keys(SetupData).forEach(key => {
			formData.append(key, SetupData[key])
		})
		images.forEach(image => {
			formData.append('image', image)
		})
		return await instance({
			url: SETUPS,
			method: 'POST',
			data: formData
		})
	},
	async update(id: number, SetupData: any, images: File[]) {
		const formData = new FormData()
		Object.keys(SetupData).forEach(key => {
			formData.append(key, SetupData[key])
		})
		images.forEach(image => {
			formData.append('image', image)
		})
		return await instance({
			url: `${SETUPS}/${id}`,
			method: 'PUT',
			data: formData
		})
	},
	async delete(id: string | number) {
		return instance<ISetups>({
			url: `${SETUPS}/${id}`,
			method: 'DELETE'
		})
	}
}
