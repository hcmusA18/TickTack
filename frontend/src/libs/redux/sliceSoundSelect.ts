import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type SoundSelectState = {
  sound: string
}

const initialState: SoundSelectState = {
  sound: ''
}

export const SoundSelectSlice = createSlice({
  name: 'soundSelect',
  initialState,
  reducers: {
    setSound(state, action: PayloadAction<string>) {
      state.sound = action.payload
    },
    clearSound() {
      return initialState
    }
  }
})

export const { setSound, clearSound } = SoundSelectSlice.actions
export const SoundSelectReducer = SoundSelectSlice.reducer
