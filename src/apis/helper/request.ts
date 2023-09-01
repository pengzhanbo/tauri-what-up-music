/**
 * 通过 useHttp() 方法，可以根据请求的不同域名、不同服务等，存在不兼容的差异
 * 那么通过多个 axios 实例来分开处理
 */
import { createHttp } from './http'
import { FETCH_BASE_URL } from '~/constants'
import { getState } from '~/store'

export const request = createHttp(FETCH_BASE_URL, {
  withCredentials: true,
})

/**
 * request 也暴露了 http（axios实例）,
 * 可以通过实例自定义其他的内容
 */
// 添加 拦截器
// request.http.interceptors.response.use((response) => response)
request.http.interceptors.request.use((config) => {
  const method = config.method?.toUpperCase()
  const cookie = getState().global.token
  if (method === 'GET' && cookie) {
    config.params = {
      cookie: encodeURIComponent(cookie),
      ...(config.params || {}),
    }
  }
  if (method === 'POST' && cookie) {
    config.data = {
      cookie,
      ...(config.data || {}),
    }
  }
  return config
})
