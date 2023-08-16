import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { useProfile } from '@/hooks/useProfile'

import buttonStyle from './favoriteButton.module.scss'
import { UserService } from '@/services/user.service'

const FavoriteButton: FC<{ productId: number }> = ({ productId }) => {
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
		<button className={buttonStyle.btn} onClick={() => mutate()}>
			{isExist ? <AiFillHeart /> : <AiOutlineHeart />}
		</button>
	)
}

export default FavoriteButton
