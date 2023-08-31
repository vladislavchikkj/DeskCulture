import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE
} from 'redux-persist'

import { cartSlice } from './cart/cart.slice'
import { userSlice } from './user/user.slice'

const isClient = typeof window != 'undefined'

const combinedReducers = combineReducers({
	cart: cartSlice.reducer,
	user: userSlice.reducer
})

let mainReducer = combinedReducers

if (isClient) {
	const { persistReducer } = require('redux-persist')
	const storage = require('redux-persist/lib/storage')

	const persistConfig = {
		key: 'descculture',
		storage,
		whitelist: ['cart']
	}

	mainReducer = persistReducer(persistConfig, combinedReducers)
}

export const store = configureStore({
	reducer: mainReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
})

export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof mainReducer>
