import axios from 'axios'

import { ACCESS_TOKEN } from '@/constants/token.constants'
import { getAccessToken, removeFromStorage } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'
import Cookies from 'js-cookie'
import { errorCatch, getContentType } from './api.helper'

const axiosOptions = {
	baseURL: process.env.SERVER_URL,
	headers: getContentType()
}

export const axiosClassic = axios.create(axiosOptions)
export const instance = axios.create(axiosOptions)

instance.interceptors.request.use(async config => {
	const accessToken = getAccessToken()
	if (config && config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

instance.interceptors.request.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			(error?.response?.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				// get new tokens
				await AuthService.getNewTokens()
				return instance.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') removeFromStorage()
				// delete tokens
			}
		}
		throw error
	}
)
axiosClassic.interceptors.request.use(config => {
	const token = Cookies.get(ACCESS_TOKEN)

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
})
