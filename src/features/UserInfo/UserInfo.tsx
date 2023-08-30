import { Icon } from '@iconify/react'

function UserInfo() {
  return (
    <div className="flex items-center justify-start px-4 py-1">
      <p className="m-0 h-10 w-10 overflow-hidden rounded-full bg-gray-300">
        <img className="inline-block h-full w-full" src="/vite.svg" alt="" />
      </p>
      <p className="ml-3 flex items-center font-bold">
        <span>用户名</span>
        <span className="icon text-text-light text-3xl">
          <Icon icon="ic:round-arrow-right" />
        </span>
      </p>
    </div>
  )
}

export default UserInfo
