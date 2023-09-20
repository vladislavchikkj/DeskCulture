export interface iAddress {
	country: string
	city: string
	street: string
	house: string
}
export interface IShippingField {
	firstName: string
	lastName: string
	adress: iAddress
	email: string
	phoneCode: string
	phone: number
}
