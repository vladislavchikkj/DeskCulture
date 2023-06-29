/** @type {import('tailwindcss').Config} */
import { transparent as _transparent } from 'tailwindcss/colors'

const colors = {
	transparent: _transparent,
	black: '#191B1D',
	white: '#fff',
	primary: '#CDCECF',
	secondary: '#BDA05F'
}

export const content = [
	'./src/**/*.{js,ts,jsx,tsx,mdx}',
	'./pages/**/*.{js,ts,jsx,tsx,mdx}'
]
export const theme = {
	extend: {}
}
export const plugins = []
