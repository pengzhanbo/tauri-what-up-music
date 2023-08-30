export interface BaseParams {
  t?: number
  realIP?: string
}

export interface ResponseBody<T = any> {
  code: number
  message: string
  result: T
}
