import cn from 'classnames'
import type { Options } from '~/typing'

export default function SubNav({
  children,
  options,
  current,
  onClick,
}: SubNavProps) {
  return (
    <div className="flex items-center">
      <div className="flex flex-1 items-center -ml-4">
        {options.map(item => (
          <p
            key={item.value}
            className={cn(
              'cursor-pointer mx-4 transition',
              item.value === current
                ? 'text-text-darker font-bold'
                : 'hover:text-text-darker',
            )}
            onClick={() => onClick?.(item.value)}
          >
            {item.label}
          </p>
        ))}
      </div>
      {children && <div className="flex items-center">{children}</div>}
    </div>
  )
}

export interface SubNavProps<T = string> {
  children?: React.ReactNode
  options: Options<T>
  onClick?: (value: T) => void
  current: T
}
