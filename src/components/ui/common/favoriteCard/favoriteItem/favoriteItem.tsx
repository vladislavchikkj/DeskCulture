import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { Dispatch, FC, SetStateAction } from 'react'

import { useProfile } from '@/hooks/useProfile'

import { IProduct } from '@/types/product.interface'

import { convertPrice } from '@/utils/convertPrice'

import { shimmer, toBase64 } from '@/components/common'
import { UserService } from '@/services/user.service'
import Image from 'next/image'
import style from './favoritesItem.module.scss'

type props = {
	item: IProduct
	setIsShow: Dispatch<SetStateAction<boolean>>
	isShow?: Boolean
}
const FavoritesItem: FC<props> = ({ item, setIsShow, isShow }) => {
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
			<Link
				onClick={() => {
					setIsShow(!isShow)
				}}
				href={`/catalog/products/${item.slug}`}
			>
				<Image
					width={500}
					height={500}
					className={style.image}
					src={item.images[0]}
					alt={item.name}
					placeholder={`data:image/svg+xml;base64,${toBase64(
						shimmer(700, 475)
					)}`}
					style={{
						maxWidth: '100%',
						height: 'auto'
					}}
				/>
			</Link>

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
