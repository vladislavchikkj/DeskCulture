import { instance } from '@/api/api.interceptor'

import { IOrder } from './order.interface'

const ORDERS = 'orders'

enum EnumOrderStatus {
	PENDING = 'PENDING',
	PAYED = 'PAYED',
	SHIPPED = 'SHIPPED',
	DELIVERED = 'DELIVERED'
}

type TypeData = {
	status?: EnumOrderStatus
	items: {
		quantity: number
		price: number
		productId: number
		productName?: string
	}[]
}

export const OrderService = {
	async getAll() {
		return instance<IOrder[]>({
			url: `${ORDERS}/by-user`,
			method: 'GET'
		})
	},
	async place(data: TypeData) {
		return instance<{ confirmationUrl: { confirmationUrl: string } }>({
			url: ORDERS,
			method: 'POST',
			data
		})
	}
}
