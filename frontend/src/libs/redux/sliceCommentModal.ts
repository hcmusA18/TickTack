import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { merge } from 'lodash'

type CommentModalState = {
  isOpen: boolean
  data: any
  modalType: number
}

const initialState: CommentModalState = {
  isOpen: false,
  data: null,
  modalType: -1
}

export const CommentModalSlice = createSlice({
  name: 'commentModal',
  initialState,
  reducers: {
    openCommentModal(state, action: PayloadAction<CommentModalState>) {
      merge(state, action.payload)
    },
    clearModal() {
      return initialState
    }
  }
})

export const { openCommentModal, clearModal } = CommentModalSlice.actions
export const CommentModalReducer = CommentModalSlice.reducer
