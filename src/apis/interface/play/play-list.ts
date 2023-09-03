/**
 * 获取歌单列表数据
 */
import { request } from '~/apis/helper'

/**
 * 传入用户 id, 可以获取用户歌单
 */
export const getPlayList = request.post<GetPlayListParams>(
  '/top/playlist?limit=10&order=new',
)

export interface GetPlayListParams {
  /**
   * 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
   */
  order?: 'new' | 'hot'
  /**
   * 歌单分类
   */
  cat?: string
  /**
   * 返回数量 , 默认为 50
   */
  limit?: number
  /**
   * 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
   */
  offset?: number
}
