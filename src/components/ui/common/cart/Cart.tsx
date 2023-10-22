import { FC } from 'react'

import BagBtn from '@/ui/common/buttons/bagbtn/BagBtn'

import { useCart } from '@/hooks/useCart'
import { useOutside } from '@/hooks/useOutside'

import PopUp from '../asidePanel/PopUp'
import CartContent from './cartContent/CartContent'

const Cart: FC = () => {
	const { isShow, setIsShow, ref } = useOutside(false)
	const { items, total } = useCart()

	return (
		<div className='relative'>
			<BagBtn onClick={() => setIsShow(!isShow)} number={items.length} />
			<PopUp isOpen={isShow} closeAsidePanel={() => setIsShow(!isShow)}>
				<CartContent
					favRef={ref}
					setIsShow={() => setIsShow(!isShow)}
				></CartContent>
			</PopUp>
		</div>
	)
}

export default Cart
