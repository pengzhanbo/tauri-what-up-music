/**
 * 查询歌手列表 分页、分类
 */
import { request } from '~/apis/helper'

export const getArtistList = request.post<
  GetArtistListParams,
  GetArtistListResponse
>('/artist/list')

export interface GetArtistListParams {
  limit?: number
  offset?: number
  type?: string
  area?: string
  initial?: string
}

export interface GetArtistListResponse {
  code: number
  artists: Artist[]
  more: boolean
}

export interface Artist {
  id: number
  name: string
  alias?: string[]
  picUrl: string
  followed: boolean
  fansCount: number
  musicSize: number
  albumSize: number
  accountId?: number
  briefDesc: string
  img1v1Url: string
  topicPerson: number
  trans: string
}
