import cn from 'clsx'
import { FC } from 'react'

import { useActions } from '@/hooks/useActions'
import { useOutside } from '@/hooks/useOutside'
import { useProfile } from '@/hooks/useProfile'

import style from './favorite.module.scss'
import FavoritesItem from './favoriteItem/favoriteItem'
import FavoriteBtn from './svg/Heart.svg.svg'
import AuthButton from '@/screens/auth/authButton/authButton'

const Favorite: FC = () => {
	const { isShow, setIsShow, ref } = useOutside(false)

	const { profile } = useProfile()
	return (
		<div ref={ref}>
			<div className={style.favorites}>
				<FavoriteBtn onClick={() => setIsShow(!isShow)} />
			</div>
			<div
				className={cn(`${style.popup}`, isShow ? 'open-menu' : 'close-menu')}
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
							<FavoritesItem key={item.id} item={item} />
						))
					) : (
						<div>YOUR BAG IS EMPTY</div>
					)}
				</div>

				<div className={style.totalBtn}>
					<AuthButton variant='black'>View my WHISHLIST</AuthButton>
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

export default Favorite
