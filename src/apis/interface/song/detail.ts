/**
 * 获取歌曲详细信息
 */
import { request } from '~/apis/helper'
import type { Song } from '~/typing/Song'

export const getSongDetail = request.post<
  {
    ids: string | number
  },
  GetSongDetailResponse
>('/song/detail')

export interface GetSongDetailResponse {
  code: number
  songs: Song[]
}
