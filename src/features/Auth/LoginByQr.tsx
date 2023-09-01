import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import useSwr from 'swr'
import { setToken } from '../Global/globalSlice'
import { setLoginType } from './authSlice'
import { checkQRKey, generateQR, generateQRKey } from '~/apis'
import { useAppDispatch } from '~/hooks'

function LoginByQr() {
  const [key, setKey] = useState('')
  const dispatch = useAppDispatch()
  const { isLoading, data, mutate } = useSwr(
    'auth/generate-qr',
    async () => {
      const { data } = await generateQRKey()
      setKey(data.unikey)
      return await generateQR({ key: data.unikey, qrimg: 1 })
    },
    { dedupingInterval: 5000 * 60 },
  )

  const qrStyle = data?.data.qrimg
    ? { backgroundImage: `url(${data.data.qrimg})`, backgroundSize: 'cover' }
    : {}

  const changeLoginType = () => {
    dispatch(setLoginType('phone'))
  }

  useEffect(() => {
    const timer = setInterval(async () => {
      if (!key) return
      const { cookie, code } = await checkQRKey({ key })
      if (code === 800) mutate()
      if (code === 803) {
        clearInterval(timer)
        dispatch(setToken(cookie))
      }
    }, 5000)

    return () => {
      timer && clearInterval(timer)
    }
  }, [key])

  return (
    <div className="h-full w-full flex-center flex-col">
      <p className="mb-4 mt-6 text-3xl font-medium text-text-dark">扫码登录</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="h-60 w-60 select-none" style={qrStyle}></div>
      )}
      <p className="font-medium -mt-2">
        使用<span className="cursor-pointer text-blue-5">网易云音乐APP</span>
        扫码登录
      </p>
      <p className="mt-25 flex-center cursor-pointer" onClick={changeLoginType}>
        <span className="text-sm">选择其他登录模式</span>
        <span className="icon ml-1 text-sm">
          <Icon icon="ps:right" />
        </span>
      </p>
    </div>
  )
}

export default LoginByQr
