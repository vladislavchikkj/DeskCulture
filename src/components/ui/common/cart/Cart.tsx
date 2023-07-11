import { FC } from 'react'

import { useOutside } from '@/hooks/useOutside'

const Cart: FC = () => {
	const { isShow, setIsShow, ref } = useOutside(false)
	return <></>
}

export default Cart
