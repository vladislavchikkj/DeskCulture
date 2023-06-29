/** @type {import('tailwindcss').Config} */

const twColors = require('tailwindcss/colors')

const colors = {
	transparent: twColors.transparent,
	black: '#191B1D',
	white: '#fff',
	primary: '#CDCECF',
	secondary: '#BDA05F'
}

module.exports = {
	content: [
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {}
	},
	plugins: []
}
