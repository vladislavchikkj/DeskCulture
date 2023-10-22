import { CSSProperties } from 'react'

export interface IShippingField {
	firstName: string
	lastName: string
	country: IOptions
	state: string
	city: string
	postCode: string
	street: string
	house: string
	phoneCode: IOptions
	phone: string
	email: string
}

export interface IOptions {
	value: string
	label: string
}

export interface ControlStyles {
	(provided: CSSProperties, state: { isFocused: boolean }): CSSProperties
}

export interface PlaceholderStyles {
	(provided: CSSProperties): CSSProperties
}
