import Cookies from 'js-cookie'

import { IAuthResponse, IEmailPassword } from '@/store/user/user.interface'

import { axiosClassic } from '@/api/api.interceptor'

import { REFRESH_TOKEN } from '@/constants/token.constants'
import { saveToStorage } from './auth.helper'

interface IPasswordResetParams {
	email: string
	token: string | string[]
	newPassword: string
}

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
	},
	async resetPassword(email: { email: string }) {
		try {
			const response = await axiosClassic({
				url: 'auth/forgot-password',
				method: 'POST',
				data: email
			})

			if (response.data.message) {
				return response.data.message
			}
		} catch (error) {
			throw error
		}
	},
	async applyNewPassword({ email, token, newPassword }: IPasswordResetParams) {
		try {
			const response = await axiosClassic({
				url: 'auth/reset-password',
				method: 'PATCH',
				data: { email, token, newPassword }
			})

			if (response.data.message) {
				return response.data.message
			}
		} catch (error) {
			throw error
		}
	}
}
