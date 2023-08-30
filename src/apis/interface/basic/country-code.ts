import { request } from '~/apis/helper'

/**
 * 获取国家编码列表
 */
export const getCountryCode = request.get('/countries/code/list')
