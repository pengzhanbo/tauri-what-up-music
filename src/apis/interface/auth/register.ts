import { request } from '~/apis/helper'

/**
 * 传入手机号码和验证码,密码,昵称, 可注册网易云音乐账号(同时可修改密码)
 */
export const registerByPhone = request.post<RegisterByPhoneParams>(
  '/register/cellphone',
)

/**
 * 可检测手机号码是否已注册
 */
export const checkPhoneExistence = request.post('/cellphone/existence/check')

export interface RegisterByPhoneParams {
  phone: string
  password: string
  /**
   * 验证码
   */
  captcha: string
  /**
   * 昵称
   */
  nickname: string
  /**
   * 国家码，用于国外手机号，例如美国传入：1 ,默认 86 即中国
   */
  countrycode?: string
}

export interface CheckPhoneExistenceParams {
  phone: string
  /**
   * 国家码，用于国外手机号，例如美国传入：1 ,默认 86 即中国
   */
  countrycode?: string
}
