import AuthButton from '@/app/auth/authButton/authButton'
import { asidePanelAnimation } from '@/components/animations/asideAnimation'
import { useProfile } from '@/hooks/useProfile'
import cn from 'clsx'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Dispatch, FC, SetStateAction } from 'react'
import style from '../favorite.module.scss'
import FavoritesItem from '../favoriteItem/favoriteItem'

type props = {
	setIsShow: Dispatch<SetStateAction<boolean>>
	isShow?: Boolean
	favRef?: any
}

const FavoriteContent: FC<props> = ({ isShow, setIsShow, favRef }) => {
	const { profile } = useProfile()

	return (
		<>
			<motion.div
				initial='hidden'
				whileInView='visible'
				variants={asidePanelAnimation}
				className={style.popup}
			>
				<div className={style.titleWrapper}>
					<div className={style.title}>WHISHLIST</div>
					<div className={style.itemsNum}>
						{profile?.favorites.length} items
					</div>
				</div>
				<div className={style.cart}>
					{profile?.favorites.length ? (
						profile?.favorites.map(item => (
							<FavoritesItem key={item.id} item={item} setIsShow={setIsShow} />
						))
					) : (
						<>
							{profile ? (
								<div>YOUR BAG IS EMPTY</div>
							) : (
								<div>Register to add to favorites</div>
							)}
						</>
					)}
				</div>

				<div className={style.totalBtn}>
					{!profile ? (
						<Link href={`/auth`} onClick={() => setIsShow(!isShow)}>
							<AuthButton variant='black'>SIGN IN</AuthButton>
						</Link>
					) : (
						<AuthButton variant='black'>View my WHISHLIST</AuthButton>
					)}
				</div>
			</motion.div>
			<div
				ref={favRef}
				onClick={() => setIsShow(!isShow)}
				className={cn(
					`${style.popupWrapper}`,
					isShow ? 'dark-bg' : 'off-dark-bg '
				)}
			>
				123
			</div>
		</>
	)
}

export default FavoriteContent
