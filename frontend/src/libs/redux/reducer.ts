import { combineReducers } from '@reduxjs/toolkit'
import { AuthReducer } from './sliceAuth'

export const rootReducer = combineReducers({
  auth: AuthReducer
})
