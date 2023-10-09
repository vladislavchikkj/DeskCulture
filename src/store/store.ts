import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE
} from 'redux-persist'
import { cartSlice } from './cart/cart.slice'
import { userSlice } from './user/user.slice'

let store: any
let persistor: any

const isClient = typeof window !== 'undefined'

const combinedReducers = combineReducers({
	cart: cartSlice.reducer,
	user: userSlice.reducer
})

let mainReducer = combinedReducers

if (isClient) {
	const { persistReducer, persistStore } = require('redux-persist')
	const storage = require('redux-persist/lib/storage').default

	const persistConfig = {
		key: 'descculture',
		storage,
		whitelist: ['cart']
	}

	mainReducer = persistReducer(persistConfig, combinedReducers)

	store = configureStore({
		reducer: mainReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
				}
			})
	})

	persistor = persistStore(store)
}

export { persistor, store }
export type TypeRootState = ReturnType<typeof mainReducer>
