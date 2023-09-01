import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import auth from './features/Auth/authSlice'
import counter from './features/Counter/CounterSlice'
import global from './features/Global/globalSlice'
import userInfo from './features/UserInfo/userInfoSlice'

export const store = configureStore({
  reducer: {
    global,
    auth,
    userInfo,
    counter,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const getState = () => store.getState()
