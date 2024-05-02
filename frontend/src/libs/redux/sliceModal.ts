import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ModalType, Post, Sound } from 'libs/types'
import { merge } from 'lodash'

type ModalState<T> = {
  isOpen: boolean
  data: T | Post | Sound[]
  modalType: ModalType
}

const initialState: ModalState<Post | Sound[]> = {
  isOpen: false,
  data: null,
  modalType: ModalType.NONE
}

export const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<ModalState<Post | Sound[]>>) {
      merge(state, action.payload)
    },
    clearModal() {
      return initialState
    }
  }
})

export const { openModal, clearModal } = ModalSlice.actions
export const ModalReducer = ModalSlice.reducer
