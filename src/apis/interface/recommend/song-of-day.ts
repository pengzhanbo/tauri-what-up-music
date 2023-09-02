import { request } from '~/apis/helper'

// 获取 每日歌曲推荐
export const getRecommendSongOfDay = request.get<
  never,
  GetRecommendSongOfDayResponse
>('/recommend/songs')

export interface GetRecommendSongOfDayResponse {
  code: number
  data: {
    dailySongs: {
      id: string
      name: string // 歌曲名称
      // 歌曲封面
      al: {
        name: string
        id: string
        picUrl: string
      }
      // 歌手信息
      ar: {
        id: string
        name: string
      }[]
      reason: string // 推荐理由
      alias: string[] // 歌曲别名
    }[]
  }
}
