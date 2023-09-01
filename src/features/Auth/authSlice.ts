import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '~/store'

export interface AuthState {
  authType: 'login' | 'register'
  loginType: 'phone' | 'email' | 'qr' | 'anonymous'
  showAuth: boolean
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loginType: 'qr',
    showAuth: false,
    authType: 'login',
  } as AuthState,
  reducers: {
    setLoginType: (state, action: PayloadAction<AuthState['loginType']>) => {
      state.loginType = action.payload
    },
    setShowAuth: (state, action: PayloadAction<boolean>) => {
      state.showAuth = action.payload
    },
    resetAuth: (state) => {
      state.authType = 'login'
      state.loginType = 'qr'
      state.showAuth = false
    },
  },
})

export const { setLoginType, setShowAuth, resetAuth } = authSlice.actions

export const selectLoginType = (state: RootState) => state.auth.loginType
export const selectShowAuth = (state: RootState) => state.auth.showAuth
export const selectAuthType = (state: RootState) => state.auth.authType

export default authSlice.reducer
