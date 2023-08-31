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
	async create() {
		return instance<ISetups>({
			url: SETUPS,
			method: 'POST'
		})
	},
	async update(id: string | number, name: string) {
		return instance<ISetups>({
			url: `${SETUPS}/${id}`,
			method: 'PUT',
			data: { name }
		})
	},
	async delete(id: string | number) {
		return instance<ISetups>({
			url: `${SETUPS}/${id}`,
			method: 'DELETE'
		})
	}
}
