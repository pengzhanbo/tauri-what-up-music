import { request } from '~/apis/helper'
import type { BaseParams } from '~/typing'

export interface LoginByEmail extends BaseParams {
  email: string
  /**
   * 密码 与 md5_password 互斥，不可同时为空
   */
  password?: string
  /**
   * md5 加密后的密码,传入后 password 参数将失效
   */
  md5_password?: string
}

/**
 * 邮箱登录
 */
export const loginByEmail = request.post<LoginByEmail>('/login')
