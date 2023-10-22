import { useMutation, useQueryClient } from '@tanstack/react-query'
import cn from 'clsx'
import { FC } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { useProfile } from '@/hooks/useProfile'

import style from './favoriteButton.module.scss'
import { UserService } from '@/services/user.service'

const FavoriteButton: FC<{ productId: number; variant?: string }> = ({
	productId,
	variant
}) => {
	const { profile } = useProfile()

	const QueryClient = useQueryClient()

	const { mutate } = useMutation(
		['toogle favorite'],
		() => UserService.toggleFavorite(productId),
		{
			onSuccess() {
				QueryClient.invalidateQueries(['get profile'])
			}
		}
	)
	if (!profile) return null

	const isExist = profile.favorites.some(favorite => favorite.id === productId)
	return (
		<button
			className={cn(`${style.btn}`, {
				[style.heartBtn]: variant === 'heart',
				[style.default]: variant === 'default'
			})}
			onClick={() => mutate()}
		>
			{isExist ? <AiFillHeart /> : <AiOutlineHeart />}
		</button>
	)
}

export default FavoriteButton
