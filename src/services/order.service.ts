import { instance } from '@/api/api.interceptor'

import { IOrder } from './order.interface'

const ORDERS = 'orders'

export const OrderService = {
	async getAll() {
		return instance<IOrder[]>({
			url: ORDERS,
			method: 'GET'
		})
	}
}
