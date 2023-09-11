export const homeAnimation = {
	hidden: {
		height: '100vh'
	},
	visible: (custom: number) => ({
		height: '70vh',
		transition: { duration: 0.9, delay: custom * 0.1 }
	})
}
export const LowBarAnimation = {
	hidden: {
		y: 300
	},
	visible: (custom: number) => ({
		y: 0,
		transition: { duration: 0.9, delay: custom * 0.2 }
	})
}
