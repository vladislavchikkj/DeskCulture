import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'

import { useProfile } from '@/hooks/useProfile'

import { IProduct } from '@/types/product.interface'

import { convertPrice } from '@/utils/convertPrice'

import style from './favoritesItem.module.scss'
import { UserService } from '@/services/user.service'

const FavoritesItem: FC<{ item: IProduct }> = ({ item }) => {
	const { profile } = useProfile()

	const QueryClient = useQueryClient()

	const { mutate } = useMutation(
		['toogle favorite'],
		() => UserService.toggleFavorite(item.id),
		{
			onSuccess() {
				QueryClient.invalidateQueries(['get profile'])
			}
		}
	)
	if (!profile) return null

	const isExist = profile.favorites.some(favorite => favorite.id === item.id)
	return (
		<div className={style.wrapper}>
			<img className={style.image} src={item.images[0]} alt={item.name} />
			<div className={style.info}>
				<div>
					<div className={style.name}>{item.name}</div>
					<div className={style.price}>{convertPrice(item.price)}</div>
				</div>
				<button className={style.remove} onClick={() => mutate()}>
					{!isExist || 'remove'}
				</button>
			</div>
		</div>
	)
}

export default FavoritesItem
