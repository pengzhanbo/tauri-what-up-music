/**
 * 用户歌单
 */
import { request } from '~/apis/helper'

export interface UserPlayListParams {
  /**
   * 用户ID
   */
  uid: string
  /**
   * 返回数量 , 默认为 30
   */
  limit?: number
  /**
   * 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
   */
  offset?: number
}

/**
 * 传入用户 id, 可以获取用户歌单
 */
export const getUserPlayList
  = request.post<UserPlayListParams>('/user/playlist')
