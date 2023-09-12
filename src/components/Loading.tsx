import { Icon } from '@iconify/react'

export default function Loading({ className }: LoadingProps) {
  return (
    <div className={`w-full flex-center ${className}`}>
      <div className="m-auto flex flex-center text-text-light-dark">
        <Icon icon="line-md:loading-twotone-loop" className="icon" />
        <span className="ml-4">加载中...</span>
      </div>
    </div>
  )
}

export interface LoadingProps {
  className?: string
}
