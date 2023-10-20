import AuthButton from '@/app/auth/authButton/authButton'
import { asidePanelAnimation } from '@/components/animations/asideAnimation'
import { useCheckout } from '@/components/context/CheckoutContext'
import { useCart } from '@/hooks/useCart'
import { convertPrice } from '@/utils/convertPrice'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Dispatch, FC, SetStateAction } from 'react'
import CartItem from '../cart-item/CartItem'
import style from '../cart.module.scss'
import CloseBtnSVG from './svg/close.svg'

type props = {
	setIsShow: Dispatch<SetStateAction<boolean>>
	isShow?: Boolean
	favRef?: any
}

const CartContent: FC<props> = ({ isShow, setIsShow, favRef }) => {
	const { items, total } = useCart()
	const { setItem } = useCheckout()
	return (
		<>
			<motion.div
				initial='hidden'
				whileInView='visible'
				variants={asidePanelAnimation}
				ref={favRef}
				className={style.popup}
			>
				<div className={style.titleWrapper}>
					<div className={style.title}>SHOPPING BAG</div>
					<div className={style.itemsNum}>{items.length} items</div>
					<div onClick={() => setIsShow(!isShow)} className={style.close}>
						<CloseBtnSVG />
					</div>
				</div>
				<div className={style.cart}>
					{items.length ? (
						items.map(item => (
							<CartItem
								setIsShow={setIsShow}
								isShowCard={isShow}
								item={item}
								key={item.product.id}
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
						<AuthButton
							onClick={() => {
								setItem(null)
								localStorage.removeItem('directBuy')
							}}
							variant='black'
						>
							View my Shopping Bag
						</AuthButton>
					</Link>
				</div>
			</motion.div>
			<div
				onClick={() => setIsShow(!isShow)}
				className={style.popupWrapper}
			></div>
		</>
	)
}

export default CartContent
