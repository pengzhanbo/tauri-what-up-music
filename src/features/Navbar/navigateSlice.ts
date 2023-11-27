import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '~/store'

export interface NavigateState {
  history: string[]
  currentHistoryIndex: number
}

export const navigateSlice = createSlice({
  name: 'navigate',
  initialState: {
    history: [location.pathname + location.search + location.hash],
    currentHistoryIndex: 0,
  } as NavigateState,
  reducers: {
    pushHistory(state, action: PayloadAction<string>) {
      if (state.currentHistoryIndex < state.history.length - 1) {
        state.history.splice(
          state.currentHistoryIndex + 1,
          state.history.length - state.currentHistoryIndex,
        )
      }
      state.history.push(action.payload)
      state.currentHistoryIndex = state.history.length - 1
    },
    replaceHistory(state, action: PayloadAction<string>) {
      if (state.currentHistoryIndex < state.history.length - 1) {
        state.history.splice(
          state.currentHistoryIndex + 1,
          state.history.length - state.currentHistoryIndex,
        )
      }
      state.history[state.history.length - 1] = action.payload
      state.currentHistoryIndex = state.history.length - 1
    },
    updateCurrentHistoryIndex(state, action: PayloadAction<number>) {
      state.currentHistoryIndex = action.payload
    },
  },
})

export const { pushHistory, replaceHistory, updateCurrentHistoryIndex }
  = navigateSlice.actions

export function forwardHistory({ navigate }: RootState) {
  let index = navigate.currentHistoryIndex
  index++
  if (index > navigate.history.length - 1)
    index = history.length - 1

  updateCurrentHistoryIndex(index)
  return navigate.history[index]
}

export function backHistory({ navigate }: RootState) {
  let index = navigate.currentHistoryIndex
  index--
  if (index < 0)
    index = 0

  updateCurrentHistoryIndex(index)
  return navigate.history[index]
}

export function isLatestHistory({ navigate }: RootState) {
  return (
    navigate.history.length === 0
    || navigate.currentHistoryIndex === navigate.history.length - 1
  )
}

export function isFirstHistory({ navigate }: RootState) {
  return navigate.currentHistoryIndex === 0 || navigate.history.length === 0
}

export default navigateSlice.reducer
