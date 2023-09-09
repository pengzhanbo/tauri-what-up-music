import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '~/store'
import type { Song } from '~/typing/Song'

export interface PlayerState {
  // 音乐播放地址
  songUrl: string
  // 播放状态
  playing: boolean
  // 音量
  volume: number // 0 ~ 100
  // 当前播放歌曲信息
  song: null | Song
  // 当前播放时间进度
  currentTime: number
  // 当前预缓存进度
  buffered: number
  // 数据加载状态
  isLoading: boolean
}

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    playing: false,
    volume: 100, // 0 ~ 100
    currentTime: 0,
    song: {},
    songUrl: '',
    isLoading: false,
  } as PlayerState,
  reducers: {
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.playing = action.payload
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload
    },
    setBuffered: (state, action: PayloadAction<number>) => {
      state.buffered = action.payload
    },
    setSong: (state, action: PayloadAction<Song>) => {
      state.song = action.payload
    },
    setSongUrl: (state, action: PayloadAction<string>) => {
      state.songUrl = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const {
  setVolume,
  setPlaying,
  setCurrentTime,
  setSong,
  setSongUrl,
  setLoading,
  setBuffered,
} = playerSlice.actions

export const selectPlayer = (state: RootState) => state.player

export default playerSlice.reducer
