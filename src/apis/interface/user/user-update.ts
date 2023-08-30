import { request } from '~/apis/helper'

export interface UserReplacePhoneParams {
  /**
   * 原手机验证码
   */
  oldcaptcha: string
  /**
   * 新手机验证码
   */
  captcha: string
  /**
   * 手机号码
   */
  phone: string
  /**
   * 国家区号,默认 86 即中国
   */
  ctcode: string
}

/**
 * 登录后调用此接口 , 可以更换绑定手机
 */
export const userReplacePhone =
  request.post<UserReplacePhoneParams>('/user/replacephone')

export interface UserInfoUpdateParams {
  /**
   * 性别 0:保密 1:男性 2:女性
   */
  gender?: 0 | 1 | 2
  /**
   * 出生日期,时间戳 unix timestamp
   */
  birthday?: number
  /**
   * 用户昵称
   */
  nickname?: string
  /**
   * 省份id
   */
  province?: string
  /**
   * 城市id
   */
  city?: string
  /**
   * 用户签名
   */
  signature?: string
}

/**
 * 登录后调用此接口 , 传入相关信息,可以更新用户信息
 */
export const userInfoUpdate = request.post('/user/update')

export type UserAvatarUpdateParams = FormData
/**
 * 登录后调用此接口,
 * 使用'Content-Type': 'multipart/form-data'上传图片。
 * formData(name 为'imgFile'),
 * 可更新头像
 *
 * imgFile
 * imgSize 图片尺寸,默认为 300
 * imgX    水平裁剪偏移,方形图片可不传,默认为 0
 * imgY    垂直裁剪偏移,方形图片可不传,默认为 0
 */
export const userAvatarUpdate =
  request.post<UserAvatarUpdateParams>('/avatar/upload')
