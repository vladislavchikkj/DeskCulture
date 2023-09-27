import { useCallback } from 'react'
import { UserService } from '@/services/user.service'
import { IUser } from '@/types/user.interface'
import { useEffect, useState } from 'react'

type UseAdminResult = {
	allUsers: IUser[]
	loading: boolean
	error: string | null
	deleteUserById: (id: number) => Promise<void>
}

export const useAdmin = (): UseAdminResult => {
	const [allUsers, setAllUsers] = useState<IUser[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchAllUsers = async () => {
			setLoading(true)
			try {
				const response = await UserService.getAllUsers()
				setAllUsers(response.data)
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: 'An error occurred while retrieving the list of users.'
				)
			} finally {
				setLoading(false)
			}
		}

		fetchAllUsers()
	}, [])

	const deleteUserById = useCallback(
		async (id: number) => {
			setLoading(true)
			try {
				await UserService.deleteUser(id)
				setAllUsers(allUsers.filter(user => user.id !== id))
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: 'An error occurred while deleting the user.'
				)
			} finally {
				setLoading(false)
			}
		},
		[allUsers]
	)

	return { allUsers, loading, error, deleteUserById }
}
