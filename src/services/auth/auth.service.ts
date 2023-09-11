import Cookies from 'js-cookie'

import { IAuthResponse, IEmailPassword } from '@/store/user/user.interface'

import { axiosClassic } from '@/api/api.interceptor'

import { REFRESH_TOKEN } from '@/constants/token.constants'
import { saveToStorage } from './auth.helper'

export const AuthService = {
	async main(type: 'login' | 'register', data: IEmailPassword) {
		const response = await axiosClassic<IAuthResponse>({
			url: `/auth/${type}`,
			method: 'POST',
			data
		})
		if (response.data.accessToken) saveToStorage(response.data)
		return response.data
	},

	async getNewTokens() {
		const refreshToken = Cookies.get(REFRESH_TOKEN)

		const response = await axiosClassic.post<string, { data: IAuthResponse }>(
			'/auth/login/access-token',
			{ refreshToken }
		)

		if (response.data.accessToken) saveToStorage(response.data)
		return response
	},
	async changePassword(changePasswordData: {
		oldPassword: string
		newPassword: string
	}) {
		try {
			const response = await axiosClassic<IAuthResponse>({
				url: 'auth/change-password',
				method: 'PATCH',
				data: changePasswordData
			})

			if (response.data.accessToken) {
				saveToStorage(response.data)
			}
		} catch (error) {
			throw error
		}
	}
}
