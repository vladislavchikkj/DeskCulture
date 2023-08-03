import cn from 'clsx'
import { FC } from 'react'

import { useCart } from '@/hooks/useCart'
import { useOutside } from '@/hooks/useOutside'
import { useProfile } from '@/hooks/useProfile'

import { convertPrice } from '@/utils/convertPrice'

import CartItem from '../../cart/cart-item/CartItem'

import style from './favoritebtn.module.scss'
import FavoriteBtn from './svg/Heart.svg.svg'
import AuthButton from '@/screens/auth/authButton/authButton'

const Favorite: FC = () => {
	const { isShow, setIsShow, ref } = useOutside(false)
	const { items, total } = useCart()
	const { profile } = useProfile()
	console.log(profile?.favorites)
	return (
		// <div className='relative' ref={ref}>
		<div className={style.favorites}>
			<FavoriteBtn onClick={() => setIsShow(!isShow)} number={items.length} />
		</div>
		// 	<div
		// 		className={cn(`${style.popup}`, isShow ? 'open-menu' : 'close-menu')}
		// 	>
		// 		<div className={style.titleWrapper}>
		// 			<div className={style.title}>WHISHLIST</div>
		// 			<div className={style.itemsNum}>{items.length} items</div>
		// 		</div>
		// 		<div className={style.cart}>
		// 			{items.length ? (
		// 				items.map(item => (
		// 					<CartItem key={item.product.id} isFavotites={true} item={item} />
		// 				))
		// 			) : (
		// 				<div>YOUR BAG IS EMPTY</div>
		// 			)}
		// 		</div>
		// 		<div className={style.total}>
		// 			<div className={style.totalText}>Total:</div>
		// 			<div className={style.totalPrice}>{convertPrice(total)}</div>
		// 		</div>
		// 		<div className={style.totalBtn}>
		// 			<AuthButton variant='black'>View my Shopping Bag</AuthButton>
		// 		</div>
		// 	</div>
		// 	<div
		// 		onClick={() => setIsShow(!isShow)}
		// 		className={cn(
		// 			`${style.popupWrapper}`,
		// 			isShow ? 'dark-bg' : 'off-dark-bg '
		// 		)}
		// 	>
		// 		123
		// 	</div>
		// </div>
	)
}

export default Favorite
