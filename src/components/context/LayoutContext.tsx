import React, { createContext, useContext, useState } from 'react'

type LayoutType = {
	layout: boolean
	updateLayout: (newValue: boolean) => void // Добавляем функцию обновления
}

const Layout = createContext<LayoutType | undefined>(undefined)

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [layout, setLayout] = useState<boolean>(false)

	const updateLayout = (newValue: boolean) => {
		setLayout(newValue)
	}

	return (
		<Layout.Provider value={{ layout, updateLayout }}>
			{children}
		</Layout.Provider>
	)
}

export const useLayout = () => {
	const context = useContext(Layout)
	if (context === undefined) {
		throw new Error('useLayout must be used within a LayoutProvider')
	}
	return context
}
