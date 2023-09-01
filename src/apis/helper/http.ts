import { combineURLs, isObject } from '@pengzhanbo/utils'
import type { Axios, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { HttpError } from './httpError'
import { FETCH_BASE_URL } from '~/constants'

export type RequestQuery<
  T extends Record<string | number, string | number> = {},
  K extends keyof T = keyof T,
> = {
  [P in K]: T[P]
}

export interface ResponseError extends Error {
  code?: string | number
  status?: string | number
}

export const axiosApi = (instance: Axios, subUrl = '') => {
  const get = <Q extends RequestQuery, T = any>(url: string) => {
    url = combineURLs(subUrl, url)
    return (
      params: Q = Object.create(null),
      config: AxiosRequestConfig = {},
    ): Promise<T> => {
      return instance.get(url, { params, ...config })
    }
  }

  const del = <D extends RequestQuery, T = any>(url: string) => {
    url = combineURLs(subUrl, url)
    return (
      params: D = Object.create(null),
      config: AxiosRequestConfig = {},
    ): Promise<T> => {
      return instance.delete(url, { params, ...config })
    }
  }

  const head = <D extends RequestQuery, T = any>(url: string) => {
    url = combineURLs(subUrl, url)
    return (
      params: D = Object.create(null),
      config: AxiosRequestConfig = {},
    ): Promise<T> => {
      return instance.head(url, { params, ...config })
    }
  }

  const post = <D extends Record<string, any>, T = any>(url: string) => {
    url = combineURLs(subUrl, url)
    url += url.includes('?') ? `&t=${Date.now()}` : `?t=${Date.now()}`
    return (
      data: D = Object.create(null),
      config: AxiosRequestConfig = {},
    ): Promise<T> => {
      return instance.post(url, data, config)
    }
  }

  const put = <D extends Record<string, any>, T = any>(url: string) => {
    url = combineURLs(subUrl, url)
    return (
      data: D = Object.create(null),
      config: AxiosRequestConfig = {},
    ): Promise<T> => {
      return instance.put(url, data, config)
    }
  }

  const patch = <D extends Record<string, any>, T = any>(url: string) => {
    url = combineURLs(subUrl, url)
    return (
      data: D = Object.create(null),
      config: AxiosRequestConfig = {},
    ): Promise<T> => {
      return instance.patch(url, data, config)
    }
  }

  const create = (url: string) => {
    return axiosApi(instance, url)
  }

  return { get, delete: del, head, post, put, patch, create }
}

export const createHttp = (
  baseURL = FETCH_BASE_URL,
  config: AxiosRequestConfig = {},
) => {
  const http = axios.create({
    baseURL,
    timeout: 50000,
    ...config,
  })

  http.interceptors.response.use(
    // fulfilled response
    (response) => {
      const data = response.data
      return data
    },
    (response: AxiosResponse) => {
      const name = `[httpError]: ${response.config.url}`
      if (response.data && isObject(response.data)) {
        throw new HttpError({
          message: response.data.message as string,
          name,
          code: response.data.code as string | number,
        })
      }
      throw new HttpError({
        message: response.statusText,
        name,
        status: response.status,
      })
    },
  )

  const api = axiosApi(http)

  return { http, ...api }
}
