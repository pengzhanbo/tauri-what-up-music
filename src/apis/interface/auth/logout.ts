import { request } from '~/apis/helper'

/**
 * 退出登录
 */
export const logout = request.post('/logout')
