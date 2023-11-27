/**
 * 新碟上架
 */
import { request } from '~/apis/helper'
import type { Artist } from '~/typing'

export const getNewAlbumList = request.post<
  GetNewAlbumListParams,
  GetNewAlbumListResponse
>('/top/album',
)

export interface GetNewAlbumListParams {
  limit?: number
  offset?: number
  area?: string
  type?: string
  year?: number | string
  month?: number | string
}

export interface GetNewAlbumListResponse {
  code: number
  hasMore: boolean
  weekData?: NewAlbum[]
  monthData: NewAlbum[]
}

export interface NewAlbum {
  id: number
  name: string
  picUrl: string
  size: number
  company: string
  blurPicUrl: string
  type: string
  subType: string
  tag: string
  artist: Artist
  artists: Artist[]
}
