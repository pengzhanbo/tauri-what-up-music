/**
 * 获取歌单列表数据
 */
import { request } from '~/apis/helper'

/**
 * 获取网友精选碟歌单
 */
export const getPlayList = request.post<GetPlayListParams, GetPlayListResponse>(
  '/top/playlist',
)

export interface GetPlayListParams {
  /**
   * 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
   */
  order?: 'new' | 'hot'
  /**
   * 歌单分类
   */
  cat?: string | number
  /**
   * 返回数量 , 默认为 50
   */
  limit?: number
  /**
   * 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
   */
  offset?: number
}

export interface GetPlayListResponse {
  code: number
  total: number
  more: boolean
  cat: string
  playlists: PlaylistOption[]
}

export interface PlaylistOption {
  id: number
  name: string
  coverImgUrl: string
  description: string
  tags: string[]
  highQuality: boolean
  playCount: number
  shareCount: number
  subscribed: boolean
  creator: {
    userId: number
    nickname: string
    avatarDetail: {
      identityIconUrl: string
    }
  }
}
