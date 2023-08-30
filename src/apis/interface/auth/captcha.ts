import { request } from '~/apis/helper'

export interface SentCaptchaParams {
  phone: string
  /**
   * 国家区号,默认 86 即中国
   */
  ctcode?: string
}

/**
 * 传入手机号码, 可发送验证码
 */
export const sentCaptcha = request.post<SentCaptchaParams>('/captcha/sent')

export interface VerifyCaptchaParams {
  phone: string
  /**
   * 国家区号,默认 86 即中国
   */
  ctcode?: string
  /**
   * 验证码
   */
  captcha: string
}
/**
 * 传入手机号码和验证码, 可校验验证码是否正确
 */
export const verifyCaptcha = request.post('/captcha/verify')
