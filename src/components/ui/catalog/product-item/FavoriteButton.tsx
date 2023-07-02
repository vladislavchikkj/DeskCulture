import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { useProfile } from '@/hooks/useProfile'

import { UserService } from '@/services/user.service'

const FavoriteButton: FC<{ productId: number }> = ({ productId }) => {
	const { profile } = useProfile()

	const { invalidateQueries } = useQueryClient()

	const { mutate } = useMutation(
		['toogle favorite'],
		() => UserService.toggleFavorite(productId),
		{
			onSuccess() {
				invalidateQueries(['get profile'])
			}
		}
	)
	if (!profile) return null

	const isExist = profile.favorites.some(favorite => favorite.id === productId)
	return (
		<div>
			<button onClick={() => mutate()}>
				{isExist ? <AiFillHeart /> : <AiOutlineHeart />}
			</button>
		</div>
	)
}

export default FavoriteButton
