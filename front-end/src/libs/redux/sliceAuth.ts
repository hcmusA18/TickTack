import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { merge } from "lodash";

type AuthState = {
  authToken: string | null;
  authEmail: string | null;
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    authToken: null,
    authEmail: null,
  } as AuthState,
  reducers: {
    setAuthToken(state, action: PayloadAction<string>) {
      state.authToken = action.payload;
    },
    setAuthEmail(state, action: PayloadAction<string>) {
      state.authEmail = action.payload;
    },
    setAuth(state, action: PayloadAction<AuthState>) {
      merge(state, action.payload);
    },
    clearAuth(state) {
      state.authToken = null;
      state.authEmail = null;
    },
  },
});

export const {
  setAuthToken,
  setAuthEmail,
  setAuth,
  clearAuth,
} = AuthSlice.actions;
export const AuthReducer = AuthSlice.reducer;