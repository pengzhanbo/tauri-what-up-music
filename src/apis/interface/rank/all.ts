import { request } from '~/apis/helper'

export const getAllTopList = request.post<never, GetAllTopListResponse>('/toplist')

export interface GetAllTopListResponse {
  code: 200
  list: GetAllTopListResponseItem[]
}

export interface GetAllTopListResponseItem {
  id: number
  name: string
  ToplistType?: string
  coverImgUrl: string
  updateTime: number
  playCount: number
  tag: string[]
  description: string
  updateFrequency: string
}
