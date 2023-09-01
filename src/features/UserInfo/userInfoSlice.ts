import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '~/store'
import type { UserAccount, UserProfile } from '~/typing/user'

export interface UserInfoState {
  account: UserAccount
  profile: UserProfile
}

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    account: {},
    profile: {},
  } as UserInfoState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfoState>) => {
      state.account = action.payload.account
      state.profile = action.payload.profile
    },
  },
})

export const { setUserInfo } = userInfoSlice.actions

export const selectUserAccount = (state: RootState) => state.userInfo.account
export const selectUserProfile = (state: RootState) => state.userInfo.profile

export default userInfoSlice.reducer
