import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { merge } from 'lodash'
import { AuthUser } from '../types'

type AuthState = {
  authToken: string | null
  user: AuthUser | null
  firstOpen: boolean
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    authToken: null,
    user: null,
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
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload
    },
    clearAuth(_state) {
      return {
        authToken: null,
        firstOpen: false,
        user: null
      }
    }
  }
})

export const { setAuthToken, setAuthEmail, setAuth, setUser, setFirstOpen, clearAuth } = AuthSlice.actions
export const AuthReducer = AuthSlice.reducer
