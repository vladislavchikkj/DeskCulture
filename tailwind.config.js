/** @type {import('tailwindcss').Config} */

const twColors = require('tailwindcss/colors')

const colors = {
	transparent: twColors.transparent,
	black: '#191B1D',
	white: '#fff',
	grey: '#CDCECF',
	greySub: '#00000080',
	primary: '#0000004D',
	secondary: '#A08750',
	red: twColors.red[400],
	darkBlue: '#203c70'
}

module.exports = {
	content: [
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		colors,
		extend: {
			fontSize: {
				10: '10px',
				25: '25px'
			}
		}
	},
	plugins: []
}
