import { InputHTMLAttributes } from 'react'

export interface IField extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: string
	error?: string
	isNameTaken?: boolean
	component?: string
}
