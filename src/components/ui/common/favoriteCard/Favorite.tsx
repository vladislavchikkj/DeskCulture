import cn from 'clsx'
import Link from 'next/link'

import { useOutside } from '@/hooks/useOutside'
import { useProfile } from '@/hooks/useProfile'

import AuthButton from '@/app/auth/authButton/authButton'
import { FC } from 'react'
import style from './favorite.module.scss'
import FavoritesItem from './favoriteItem/favoriteItem'
import FavoriteBtn from './svg/Heart.svg.svg'

const Favorite: FC = () => {
	const { isShow, setIsShow, ref } = useOutside(false)

	const { profile } = useProfile()

	// Function to render the appropriate message for the button

	return (
		<div ref={ref}>
			<div className={style.favorites} onClick={() => setIsShow(!isShow)}>
				<FavoriteBtn />
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
							<FavoritesItem
								key={item.id}
								item={item}
								setIsShow={setIsShow}
								isShow={isShow}
							/>
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
