import { request } from '~/apis/helper'
import type { BaseParams } from '~/typing'

/**
 * 调用此接口可生成一个 key
 */
export const generateQRKey = request.get<
  never,
  {
    code: number
    data: {
      code: number
      unikey: string
    }
  }
>('/login/qr/key',
)

export interface GenerateQRParams extends BaseParams {
  key: string
  qrimg?: 1
}

export interface GenerateQRResPonse {
  code: number
  data: {
    qrurl: string
    qrimg: string
  }
}

/**
 * 调用此接口传入上一个接口生成的 key 可生成二维码图片的 base64 和二维码信息,
 * 可使用 base64 展示图片,或者使用二维码信息内容自行使用第三方二维码生成库渲染二维码
 */
export const generateQR = request.get<GenerateQRParams, GenerateQRResPonse>(
  '/login/qr/create',
)

export interface CheckQRKeyParams {
  key: string
  noCookie?: 'true'
}

export interface CheckQRKeyResponse {
  cookie: string
  code: 800 | 801 | 802 | 803
  message: string
}

/**
 * 轮询此接口可获取二维码扫码状态,
 * 800 为二维码过期,
 * 801 为等待扫码,
 * 802 为待确认,
 * 803 为授权登录成功(803 状态码下会返回 cookies),
 * 如扫码后返回502,则需加上noCookie参数,如&noCookie=true
 */
export const checkQRKey = request.get<CheckQRKeyParams, CheckQRKeyResponse>(
  '/login/qr/check',
)
