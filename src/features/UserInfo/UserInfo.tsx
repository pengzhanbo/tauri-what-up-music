import { Icon } from '@iconify/react'

function UserInfo() {
  return (
    <div className="flex items-center justify-start px-4 pb-4 pt-2">
      <p className="m-0 h-10 w-10 overflow-hidden rounded-full bg-gray-300">
        <img className="inline-block h-full w-full" src="/vite.svg" alt="" />
      </p>
      <p className="ml-3 flex items-center font-medium">
        <span className="text-text-dark">用户名</span>
        <span className="icon text-text-light text-3xl">
          <Icon icon="ic:round-arrow-right" />
        </span>
      </p>
    </div>
  )
}

export default UserInfo
