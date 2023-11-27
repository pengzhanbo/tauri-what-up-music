import { isNumber } from '@pengzhanbo/utils'
import cn from 'classnames'
import { memo } from 'react'

// eslint-disable-next-line prefer-arrow-callback
export default memo(function Rectangle({
  size = '100%',
  ratio = 1,
  children,
  className,
  onClick,
}: RectangleProps) {
  size = (isNumber(size) ? `${size}px` : size) as string

  const isPx = size.endsWith('px')
  const width = size
  const height = isPx ? size : 0
  const style = {
    width,
    height,
    paddingTop: isPx ? 0 : `${ratio * 100}%`,
  }
  const childClass = cn('absolute left-0 top-0 h-full w-full', className)
  return (
    <div className="relative" style={{ width }} onClick={onClick}>
      <div className="relative z-0" style={style}></div>
      <div className={childClass}>{children}</div>
    </div>
  )
})

export interface RectangleProps {
  children?: React.ReactNode
  size?: number | string
  ratio?: number
  className?: string
  onClick?: () => void
}
