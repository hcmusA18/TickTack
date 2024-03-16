import { combineReducers } from '@reduxjs/toolkit'
import { AuthReducer } from './sliceAuth'
import { CommentModalReducer } from './sliceCommentModal'

export const rootReducer = combineReducers({
  auth: AuthReducer,
  commentModal: CommentModalReducer
})
