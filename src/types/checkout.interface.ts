import { CSSProperties } from 'react'

export interface IShippingField {
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
