/**
 * 推荐 电台 / 播客
 */
import { request } from '~/apis/helper'

export const getRecommendPodcast = request.post<
  never,
  GetRecommendPodcastResponse
>('/personalized/djprogram')

export interface GetRecommendPodcastResponse {
  code: number
  category: number
  result: {
    id: number
    name: string
    copywriter: string
    picUrl: string
    type: number
    program: {
      id: number
      name: string
      dj: {
        brand: string
        nickname: string
      }
    }
  }[]
}
