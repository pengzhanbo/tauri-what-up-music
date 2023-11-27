/**
 * 获取歌曲播放地址
 */
import { request } from '~/apis/helper'
import type { SongPlayUrl } from '~/typing/Song'

export const getSongPlayUrl = request.post<
  {
    id: string | number
    br?: number
  },
  GetSongPlayUrlResponse
>('/song/url',
)

export interface GetSongPlayUrlResponse {
  code: number
  data: SongPlayUrl[]
}
