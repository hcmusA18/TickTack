import { combineReducers } from '@reduxjs/toolkit'
import { AuthReducer } from './sliceAuth'
import { ModalReducer } from './sliceModal'
import { SoundSelectReducer } from './sliceSoundSelect'

export const rootReducer = combineReducers({
  auth: AuthReducer,
  modal: ModalReducer,
  soundSelect: SoundSelectReducer
})
