import cn from 'clsx'
import { useRouter } from 'next/router'
import { FC } from 'react'

import BagBtn from '@/ui/common/buttons/bagbtn/BagBtn'

import { useCart } from '@/hooks/useCart'
import { useOutside } from '@/hooks/useOutside'

import { convertPrice } from '@/utils/convertPrice'

import CartItem from './cart-item/CartItem'
import style from './cart.module.scss'

const Cart: FC = () => {
	const { isShow, setIsShow, ref } = useOutside(false)
	const { items, total } = useCart()
	const { push } = useRouter()

	return (
		<div className='relative' ref={ref}>
			<BagBtn onClick={() => setIsShow(!isShow)} number={items.length} />

			<div
				className={cn(`${style.popup}`, isShow ? 'open-menu' : 'close-menu')}
			>
				<div className={style.title}>SHOPPING BAG</div>
				<div className={style.itemsNum}>2 items</div>
				<div className={style.cart}>
					{items.length ? (
						items.map(item => <CartItem item={item} key={item.id} />)
					) : (
						<div>YOUR BAG IS EMPTY</div>
					)}
				</div>
				<div>
					<div>Total:</div>
					<div>{convertPrice(total)}</div>
				</div>
				<div>
					<button>Place order</button>
				</div>
			</div>
			<div
				onClick={() => setIsShow(!isShow)}
				className={cn(
					`${style.popupWrapper}`,
					isShow ? 'dark-bg' : 'off-dark-bg '
				)}
			></div>
		</div>
	)
}

export default Cart
