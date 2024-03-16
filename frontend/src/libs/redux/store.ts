import { configureStore } from '@reduxjs/toolkit'
import * as storage from 'libs/utils/storage'
import { rootReducer } from './reducer'

export const store = configureStore({
  reducer: rootReducer
})

// Save auth state to storage when it changes
store.subscribe(() => {
  const { auth } = store.getState()
  storage.saveString('AUTH_TOKEN', auth.authToken ?? '')
  storage.saveString('AUTH_EMAIL', auth.authEmail ?? '')
})

// Export the store type
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
