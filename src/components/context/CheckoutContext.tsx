import { ICartItem } from '@/types/cart.interface'
import { createContext, useContext, useState } from 'react'

export type CheckoutContextProps = {
	item: ICartItem | null
	setItem: (item: ICartItem | null) => void
}

export const CheckoutContext = createContext<CheckoutContextProps | undefined>(
	undefined
)

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
	const [item, setItem] = useState<ICartItem | null>(null)

	return (
		<CheckoutContext.Provider value={{ item, setItem }}>
			{children}
		</CheckoutContext.Provider>
	)
}

export function useCheckout(): CheckoutContextProps {
	const context = useContext(CheckoutContext)
	if (context === undefined) {
		throw new Error('useCheckout must be used within a CheckoutProvider')
	}
	return context
}
