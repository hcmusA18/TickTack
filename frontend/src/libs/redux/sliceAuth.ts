import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { merge } from 'lodash'

type AuthState = {
  authToken: string | null
  authEmail: string | null
  firstOpen: boolean
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    authToken: null,
    authEmail: null,
    firstOpen: true
  } as AuthState,
  reducers: {
    setAuthToken(state, action: PayloadAction<string>) {
      return {
        ...state,
        authToken: action.payload
      }
    },
    setAuthEmail(state, action: PayloadAction<string>) {
      return {
        ...state,
        authEmail: action.payload
      }
    },
    setFirstOpen(state) {
      return {
        ...state,
        firstOpen: false
      }
    },
    setAuth(state, action: PayloadAction<AuthState>) {
      merge(state, action.payload)
    },
    clearAuth(_state) {
      return {
        authToken: null,
        authEmail: null,
        firstOpen: false
      }
    }
  }
})

export const { setAuthToken, setAuthEmail, setAuth, setFirstOpen, clearAuth } = AuthSlice.actions
export const AuthReducer = AuthSlice.reducer
