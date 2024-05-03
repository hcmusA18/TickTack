import { combineReducers } from '@reduxjs/toolkit'
import { AuthReducer } from './sliceAuth'
import { ModalReducer } from './sliceModal'
import { VideoPostReducer } from './sliceVideoPost'
import { SoundSelectReducer } from './sliceSoundSelect'
import { SearchReducer } from './sliceSearch'

export const rootReducer = combineReducers({
  auth: AuthReducer,
  modal: ModalReducer,
  soundSelect: SoundSelectReducer,
  videoPost: VideoPostReducer,
  search: SearchReducer
})
