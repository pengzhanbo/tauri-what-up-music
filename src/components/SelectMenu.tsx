import cn from 'classnames'
import { memo } from 'react'
import type { Options } from '~/typing'

// eslint-disable-next-line prefer-arrow-callback
export default memo(function SelectMenu({
  className,
  title,
  current,
  list,
  onClick,
}: SelectMenuProps) {
  const width = list.length > 10 ? 'w-18' : 'w-22'
  return (
    <div className={`flex pb-1 ${className}`}>
      {title && (
        <div className="h-28px cursor-default text-sm leading-28px">
          {title}
          ：
        </div>
      )}
      <div className="flex flex-1 flex-wrap items-center text-sm text-text-light-dark">
        {list.map((item, i) => (
          <div
            key={item.value}
            className={cn(
              'relative h-28px flex-center',
              'before:(content-[""] absolute top-50% -right-1 block w-0 h-12px border-r border-gray-100 -translate-y-50%)',
              'last-of-type:before:border-none',
              i === 0 ? 'w-18' : width,
            )}
          >
            <span
              className={cn(
                'm-auto h-22px px-3 leading-21px cursor-pointer transition rounded-11px transition',
                item.value === current
                  ? 'text-brand bg-brand-lighter'
                  : 'text-text-light-dark hover:text-text-brand',
              )}
              onClick={() => onClick?.(item.value)}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
})

export interface SelectMenuProps<T = string> {
  className?: string
  title?: string
  current: T
  list: Options<T>
  onClick?: (item: T) => void
}
