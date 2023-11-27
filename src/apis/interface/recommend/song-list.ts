import { request } from '~/apis/helper'

// 获取推荐歌单
export const getRecommendSongList = request.post<
  {
    limit: number
  },
  GetRecommendSongListResponse
>('/personalized',
)

export interface GetRecommendSongListResponse {
  code: number
  hasTaste: boolean
  category: number
  result: {
    id: number
    name: string
    picUrl: string
    playCount: number
    type: number
    canDislike: boolean
    trackNumberUpdateTime: number
    trackCount: number
    highQuality: boolean
    alg: string
  }[]
}
