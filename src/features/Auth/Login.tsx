import { selectLoginType } from './authSlice'
import LoginByPhone from './LoginByPhone'
import LoginByQr from './LoginByQr'
import { useAppSelector } from '~/hooks'

function Login() {
  const loginType = useAppSelector(selectLoginType)

  return (
    <div className="h-full w-full">
      {loginType === 'phone' && <LoginByPhone />}
      {loginType === 'qr' && <LoginByQr />}
    </div>
  )
}

export default Login
