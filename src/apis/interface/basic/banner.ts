import { request } from '~/apis/helper'

/**
 * 获取 发现页 轮播图
 */
export const getDiscoverBanner = request.get<
  never,
  {
    code: number
    banners: DiscoverBannerResponseItem[]
  }
>('/banner?type=0')

export interface DiscoverBannerResponseItem {
  imageUrl: string
  titleColor: string
  typeTitle: string
  targetType: number
  targetId: number
  url: null | string
  video: null | string
  song: null | string
}
