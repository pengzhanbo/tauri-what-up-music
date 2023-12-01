/**
 * 获取歌单详情，排行榜也属于歌单的一种，均使用相同的接口
 */
import { request } from '~/apis/helper'
import type { Song } from '~/typing/Song'

export const getPlayListDetail = request.post<
  {
    id: number // 歌单 ID
    s?: number // 获取 s 个歌单最近的收藏者
  },
  GetPlayListDetailResponse
>('/playlist/detail')

export const getPlayListAllTrack = request.post<
  {
    id: number
    limit?: number
    offset?: number
  },
  GetPlayListAllTrack
>('/playlist/track/all')

export interface GetPlayListAllTrack {
  code: number
  songs: Song[]
}

export interface GetPlayListDetailResponse {
  code: number
  fromUserCount: number
  fromUsers: number
  playlist: PlaylistDetail
}

export interface PlaylistDetail {
  id: number
  name: string
  coverImgUrl: string
  description: string
  highQuality: boolean
  commentCount: number
  newImported: boolean
  playCount: number
  shareCount: number
  subscribedCount: number
  ToplistType: string
  trackCount: number
  trackIds: TrackIdOptions[]
  tracks: TrackOptions[]
  trackUpdateTime: number
  createTime: number
  updateTime: number
  tags: string[]
  creator: {
    id: number
    nickname: string
    avatarUrl: string
    avatarDetail: {
      identityIconUrl: string
    }
  }
}

export interface TrackIdOptions {
  id: number
  ratio: number
  lr?: number
  at?: number
  sc?: number
  sr?: number
  f?: number
  t?: number
  uid: number
  alg?: number
  rcmdReason: string
  v: number
}

export interface TrackOptions {
  id: number
  name: string
  no: number
  alias: string[]
  mv: number
  publishTime: number
  al: {
    id: number
    name: number
    picUrl: string
  }
  ar: {
    id: number
    name: string
    alias: string[]
  }[]
  tns?: string[]
  v: number
}
