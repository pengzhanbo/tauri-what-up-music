import { request } from '~/apis/helper'

export const getHighQualityPlayList = request.post<
  GetHighQualityPlayListParams,
  GetHighQualityPlayListResponse
>('/top/playlist/highquality')

export interface GetHighQualityPlayListParams {
  /**
   * 歌单标签
   */
  cat?: string | number
  /**
   * 取出歌单数量 , 默认为 50
   */
  limit?: number
  /**
   * 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
   */
  before?: number
}

export interface GetHighQualityPlayListResponse {
  code: number
  more: boolean
  lasttime: number
  total: number
  playlists: HighQualityPlayListItem[]
}

export interface HighQualityPlayListItem {
  id: number
  name: string
  status: number
  description: string
  copywriter: string
  subscribedCount: number
  createTime: number
  updateTime: number
  coverImgUrl: string
  coverImgId: number
  userId: number
  trackCount: number
  trackNumberUpdateTime: number
  trackUpdateTime: number
  tags: string[]
  playCount: number
  specialType: number
  totalDuration: number
  subscribed: boolean
  commentCount: number
  commentThreadId: string
  shareCount: number
  highQuality: boolean
  creator: {
    userId: number
    nickname: string
    gender: number
    city: number
    signature: string
    avatarUrl: string
    backgroundUrl: string
  }
}
