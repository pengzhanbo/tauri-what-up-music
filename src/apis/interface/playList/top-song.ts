/**
 * 新歌速递
 */
import { request } from '~/apis/helper'

export const getNewTopSong = request.post<
  {
    type?: string
  },
  GetNewTopSongResponse
>('/top/song')

export interface GetNewTopSongResponse {
  code: number
  data: TopSongItem[]
}

export interface TopSongItem {
  id: number
  name: string
  alias: string[]
  transNames: string[]
  duration: number
  mvid: number
  album: {
    id: number
    name: string
    picUrl: string
  }
  artists: {
    id: number
    name: string
  }[]
}
