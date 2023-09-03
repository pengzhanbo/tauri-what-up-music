/**
 * 独家放送
 */
import { request } from '~/apis/helper'

export const getPersonalizedPrivateContent = request.post<
  never,
  GetPersonalizedPrivateContentResponse
>('/personalized/privatecontent?limit=4')

export interface GetPersonalizedPrivateContentResponse {
  code: number
  name: string
  result: {
    id: number
    name: string
    url: string
    picUrl: string
    sPicUrl: string
    type: number
    copywriter: string
    alg: string
  }[]
}
