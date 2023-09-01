import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '~/store'

export interface GlobalState {
  token: string
}

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    token: localStorage.getItem('token') || '',
  } as GlobalState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      localStorage.setItem('token', action.payload)
    },
  },
})

export const { setToken } = globalSlice.actions
export default globalSlice.reducer

export const selectToken = (state: RootState) => state.global.token
