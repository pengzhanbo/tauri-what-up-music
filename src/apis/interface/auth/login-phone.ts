import { request } from '~/apis/helper'
import type { BaseParams } from '~/typing'

export interface LoginByPhoneParams extends BaseParams {
  /**
   * 手机号码
   */
  phone: string
  /**
   * 密码 与 md5_password 互斥，不可同时为空
   */
  password?: string
  /**
   * md5 加密后的密码,传入后 password 参数将失效
   */
  md5_password?: string
  /**
   * 国家码，用于国外手机号登录
   */
  countrycode?: string
  /**
   * 验证码,使用 /captcha/sent接口传入手机号获取验证码,调用此接口传入验证码,
   * 可使用验证码登录,传入后 password 参数将失效
   */
  captcha?: string
}

export interface LoginByPhoneResponseData {}

/**
 * 手机登录
 * 支持 手机+密码  和 手机+验证码
 */
export const loginByPhone = request.post<
  LoginByPhoneParams,
  LoginByPhoneResponseData
>('/login/cellphone')
