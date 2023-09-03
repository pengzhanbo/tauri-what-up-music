import { Icon } from '@iconify/react'
import useSwr from 'swr'
import { selectUserProfile, setUserInfo } from './userInfoSlice'
import { userAccount } from '~/apis'
import { setShowAuth } from '~/features/Auth/authSlice'
import { selectToken } from '~/features/Global/globalSlice'
import { useAppDispatch, useAppSelector } from '~/hooks'

function UserInfo() {
  const token = useAppSelector(selectToken)
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectUserProfile)
  const { data } = useSwr(token ? 'user-info' : null, () => userAccount())
  data && dispatch(setUserInfo(data))

  const avatar = profile.avatarUrl

  const handleClick = () => {
    if (!token) {
      dispatch(setShowAuth(true))
    }
  }

  return (
    <div className="flex items-center justify-start px-4 pb-4 pt-2">
      <p
        className="m-0 h-10 w-10 flex-center cursor-pointer overflow-hidden rounded-full bg-gray-300"
        onClick={handleClick}
      >
        {!avatar ? (
          <span className="icon text-4xl text-white">
            <Icon icon="ph:user-light" />
          </span>
        ) : (
          <img className="inline-block h-full w-full" src={avatar} alt="" />
        )}
      </p>
      <p
        className="ml-3 flex cursor-pointer items-center font-medium"
        onClick={handleClick}
      >
        <span className="text-text-dark">
          {token ? profile.nickname : '未登录'}
        </span>
        <span className="icon text-3xl text-text-light">
          <Icon icon="ic:round-arrow-right" />
        </span>
      </p>
    </div>
  )
}

export default UserInfo
