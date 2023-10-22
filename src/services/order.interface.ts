import { ICartItem } from '@/types/cart.interface'

export enum EnumOrderStatus {
	PENDING = 'PENDING',
	PAYED = 'PAYED',
	SHIPPED = 'SHIPPED',
	DELIVERED = 'DELIVERED'
}

export interface IOrder {
	id: number
	createdAt: string
	items: ICartItem[]
	status: EnumOrderStatus
	userId: number
	total: number
	paymentUrl: string
	paymentIntentId: string
	email: string
}

export interface IPersonInfo {
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
}

export interface IOrderWithPerson extends IOrder, IPersonInfo {}
