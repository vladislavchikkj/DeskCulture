import { instance } from '@/api/api.interceptor'

import { IOrder } from './order.interface'

const ORDERS = 'orders'

enum EnumOrderStatus {
	PENDING = 'PENDING',
	PAYED = 'PAYED',
	SHIPPED = 'SHIPPED',
	DELIVERED = 'DELIVERED'
}

export type PlaceOrderData = {
	status?: EnumOrderStatus
	items: {
		quantity: number
		price: number
		productId: number
	}[]
	firstName: string
	lastName: string
	country: string
	state: string
	city: string
	postCode: string
	street: string
	house: string
	phoneCode: string
	phone: string
	email: string
}

export const OrderService = {
	async getAll() {
		return instance<IOrder[]>({
			url: `${ORDERS}/by-user`,
			method: 'GET'
		})
	},
	async place(data: PlaceOrderData) {
		return instance<{ orderResponse: { url: string } }>({
			url: ORDERS,
			method: 'POST',
			data
		})
	}
}
