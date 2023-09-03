/**
 * 获取歌单分类
 * 热门歌单分类，全部歌单分类, 精品歌单分类标签
 */
import { request } from '~/apis/helper'

/**
 * 热门歌单分类
 */
export const getHotCatList = request.get<never>('/playlist/hot')

/**
 * 全部歌单分类
 */
export const getAllCatList = request.get<never>('/playlist/catlist')

/**
 * 精品歌单分类标签
 */
export const getHighQualityPlayListTags = request.get<never>(
  '/playlist/highquality/tags',
)
