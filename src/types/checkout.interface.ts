export interface iAddress {
	country: string
	city: string
	street: string
	house: string
}
export interface IShippingField {
	firstName: string
	lastName: string
	address: iAddress
	email: string
	phoneCode: string
	phone: number
}

export interface IOptions {
	value: string
	label: string
}
