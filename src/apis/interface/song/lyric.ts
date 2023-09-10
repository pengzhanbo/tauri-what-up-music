/**
 * 获取歌词
 */
import { request } from '~/apis/helper'
import type { SongLyric } from '~/typing/Song'

export const getSongLyric = request.post<
  {
    id: number
  },
  GetSongLyric
>('/lyric/new')

export interface GetSongLyric {
  code: number
  qfy: boolean
  sfy: boolean
  sgc: boolean
  // 逐句歌词
  lrc: SongLyric
  // 逐字歌词
  yrc: SongLyric
}
