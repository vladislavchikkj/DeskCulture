import {
	AnyAction,
	CombinedState,
	combineReducers,
	configureStore,
	Reducer
} from '@reduxjs/toolkit'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { cartSlice } from './cart/cart.slice'
import { ICartInitialState } from './cart/cart.types'
import { IInitialState } from './user/user.interface'
import { userSlice } from './user/user.slice'

const isClient = typeof window !== 'undefined'

const combinedReducers = combineReducers({
	cart: cartSlice.reducer,
	user: userSlice.reducer
})

let mainReducer: Reducer<
	CombinedState<{
		cart: ICartInitialState
		user: IInitialState
	}>,
	AnyAction
> = combinedReducers

if (isClient) {
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

export type TypeRootState = ReturnType<typeof combinedReducers>
