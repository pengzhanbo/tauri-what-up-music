import { request } from '~/apis/helper'
import type { UserAccount, UserProfile } from '~/typing/user'

/**
 * 登录后调用此接口 , 传入用户 id, 可以获取用户详情
 */
export const userDetail = request.post<{
  id: string
}>('/user/detail')

/**
 * 登录后调用此接口 ,可获取用户账号信息
 */
export const userAccount = request.post<
  never,
  {
    code: number
    account: UserAccount
    profile: UserProfile
  }
>('/user/account',
)

/**
 * 获取用户信息 , 歌单，收藏，mv, dj 数量
 */
export const userSubCount = request.post('/user/subcount')

/**
 * 登录后调用此接口 ,
 * 可以获取用户等级信息,
 * 包含当前登录天数,听歌次数,下一等级需要的登录天数和听歌次数,当前等级进度,
 * @see https://music.163.com/#/user/level
 */
export const userLevel = request.post('/user/level')

/**
 * 登录后调用此接口 , 可以获取用户绑定信息
 */
export const userBinding = request.post<{
  uid: string // 用户 id
}>('/user/binding')

/**
 * 登录后调用此接口,可获取私信和通知数量信息
 */
export const userPersonalLetter = request.post('/pl/count')
