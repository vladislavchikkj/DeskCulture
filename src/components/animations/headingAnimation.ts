export const headingAnimation = {
	hidden: {
		y: 300,
		opacity: 0
	},
	visible: (custom: number) => ({
		y: 0,
		opacity: 1,
		transition: { duration: 0.4, delay: custom * 0.2 }
	})
}
