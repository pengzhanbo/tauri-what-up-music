import { Icon } from '@iconify/react'
import { resetAuth, selectAuthType, selectShowAuth } from './authSlice'
import Login from './Login'
import Register from './Register'
import Modal from '~/components/Modal'
import { useAppDispatch, useAppSelector } from '~/hooks/store'

function Auth() {
  const authType = useAppSelector(selectAuthType)
  const show = useAppSelector(selectShowAuth)
  const dispatch = useAppDispatch()
  const close = () => dispatch(resetAuth())

  return (
    <Modal
      className="left-0 top-0 h-full w-full flex-center"
      show={show}
      onClick={close}
    >
      <div className="relative m-auto h-80% w-100 border rounded-xl bg-white p-3 shadow-2xl shadow-gray-300">
        <span
          className="absolute left-3 top-3 icon cursor-pointer text-text-light"
          onClick={close}
        >
          <Icon icon="ic:outline-close" />
        </span>
        {authType === 'login' ? <Login /> : <Register />}
      </div>
    </Modal>
  )
}

export default Auth
