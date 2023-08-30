import { request } from '~/apis/helper'

export interface RebindPhoneParams {
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
 * 更换绑定手机
 *
 * (流程:先发送验证码到原手机号码,再发送验证码到新手机号码然后再调用此接口)
 */
export const rebindPhone = request.post<RebindPhoneParams>('/rebind')
