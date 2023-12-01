/**
 * 获取歌单分类
 * 热门歌单分类，全部歌单分类, 精品歌单分类标签
 */
import { request } from '~/apis/helper'

/**
 * 热门歌单分类
 */
export const getHotCatList = request.post<never, GetHotCatListResponse>('/playlist/hot')

/**
 * 全部歌单分类
 */
export const getAllCatList = request.post<never, GetAllCatListResponse>('/playlist/catlist')

/**
 * 精品歌单分类标签
 */
export const getHighQualityPlayListTags = request.post<
  never,
  GetHighQualityPlayListTags
>('/playlist/highquality/tags')

export interface GetHotCatListResponse {
  code: number
  tags: {
    category: number
    name: string
    id: number
  }[]
}

export interface GetAllCatListResponse {
  code: number
  categories: Record<number, string>
  all: {
    name: string
    category: number
  }
  sub: {
    category: number
    name: string
    hot: boolean
  }[]
}

export interface GetHighQualityPlayListTags {
  code: number
  tags: {
    id: number
    name: string
    hot: boolean
    category: number
    type: number
  }[]
}
