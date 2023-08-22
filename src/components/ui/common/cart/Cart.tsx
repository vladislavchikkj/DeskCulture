import cn from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

import BagBtn from '@/ui/common/buttons/bagbtn/BagBtn'

import { useCart } from '@/hooks/useCart'
import { useOutside } from '@/hooks/useOutside'

import { convertPrice } from '@/utils/convertPrice'

import CartItem from './cart-item/CartItem'
import style from './cart.module.scss'
import AuthButton from '@/screens/auth/authButton/authButton'

const Cart: FC = () => {
	const { isShow, setIsShow, ref } = useOutside(false)
	const { items, total } = useCart()
	return (
		<div className='relative' ref={ref}>
			<BagBtn onClick={() => setIsShow(!isShow)} number={items.length} />

			<div
				className={cn(`${style.popup}`, isShow ? 'open-menu' : 'close-menu')}
			>
				<div className={style.titleWrapper}>
					<div className={style.title}>SHOPPING BAG</div>
					<div className={style.itemsNum}>{items.length} items</div>
				</div>
				<div className={style.cart}>
					{items.length ? (
						items.map(item => (
							<CartItem
								setIsShow={setIsShow}
								isShowCard={isShow}
								item={item}
								key={item.product.id}
								// isFavotites={item.product.id % 2 == 0}
							/>
						))
					) : (
						<div>YOUR BAG IS EMPTY</div>
					)}
				</div>
				<div className={style.total}>
					<div className={style.totalText}>Total:</div>
					<div className={style.totalPrice}>{convertPrice(total)}</div>
				</div>
				<div className={style.totalBtn}>
					<Link
						onClick={() => {
							setIsShow(!isShow)
						}}
						href={'/cart'}
					>
						<AuthButton variant='black'>View my Shopping Bag</AuthButton>
					</Link>
				</div>
			</div>
			<div
				onClick={() => setIsShow(!isShow)}
				className={cn(
					`${style.popupWrapper}`,
					isShow ? 'dark-bg' : 'off-dark-bg '
				)}
			>
				123
			</div>
		</div>
	)
}

export default Cart
