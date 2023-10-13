export const breadcrumbsAnimation = {
	hidden: {
		y: 100
	},
	visible: (custom: number) => ({
		y: 0,
		transition: { duration: 0.8, delay: custom * 0.2 }
	})
}

export const imageAnimation = {
	hidden: {
		scale: 1.2
	},
	visible: (custom: number) => ({
		scale: 1,
		transition: { duration: 0.8, delay: custom * 0.2 }
	})
}
