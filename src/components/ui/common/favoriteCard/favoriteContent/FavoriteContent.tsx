import AuthButton from '@/app/auth/authButton/authButton'
import { asidePanelAnimation } from '@/components/animations/asideAnimation'
import { useProfile } from '@/hooks/useProfile'
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
		<div>
			<motion.div
				initial='hidden'
				whileInView='visible'
				variants={asidePanelAnimation}
				className={style.popup}
				ref={favRef}
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
				onClick={() => setIsShow(!isShow)}
				className={style.popupWrapper}
			></div>
		</div>
	)
}

export default FavoriteContent
