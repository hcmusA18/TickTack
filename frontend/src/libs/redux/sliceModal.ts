import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ModalType, Post, Sound } from 'libs/types'
import { merge } from 'lodash'

type ModalState = {
  isOpen: boolean
  data: any | Post | Sound[]
  modalType: ModalType
}

const initialState: ModalState = {
  isOpen: false,
  data: null,
  modalType: ModalType.NONE
}

export const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<ModalState>) {
      merge(state, action.payload)
    },
    clearModal() {
      return initialState
    }
  }
})

export const { openModal, clearModal } = ModalSlice.actions
export const ModalReducer = ModalSlice.reducer
