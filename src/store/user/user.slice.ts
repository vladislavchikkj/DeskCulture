import { createSlice } from '@reduxjs/toolkit'

import { getStoreLocal } from '@/utils/local-storage'

import { checkAuth, login, logout, register } from './user.actions'
import { IInitialState } from './user.interface'

const initialState: IInitialState = {
	user: getStoreLocal('user'),
	isLoading: false,
	error: null // Добавили новое поле для хранения данных об ошибке
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(register.pending, state => {
				state.isLoading = true
				state.error = null // Сброс ошибки при начале нового запроса
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
			})
			.addCase(register.rejected, (state, { error }) => {
				state.isLoading = false
				state.error = error.message ?? null
			})
			.addCase(login.pending, state => {
				state.isLoading = true
				state.error = null // Сброс ошибки при начале нового запроса
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
			})
			.addCase(login.rejected, (state, { error }) => {
				state.isLoading = false
				state.user = null
				state.error = error.message ?? null
			})
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.user = null
				state.error = null // Сброс ошибки при успешной операции
			})
			.addCase(checkAuth.fulfilled, (state, { payload }) => {
				state.user = payload.user
			})
	}
})
