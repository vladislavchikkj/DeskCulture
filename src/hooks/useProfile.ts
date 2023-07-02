import { useQuery } from '@tanstack/react-query'

import { IFullUser } from '@/types/user.interface'

import { UserService } from '@/services/user.service'

export const useProfile = () => {
	const { data } = useQuery(['get profile'], () => UserService.getProfile(), {
		select: ({ data }) => data
	})
	return { profile: data || ({} as IFullUser) }
}
