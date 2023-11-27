import { Icon } from '@iconify/react'
import cn from 'classnames'
import { forwardRef } from 'react'

// eslint-disable-next-line prefer-arrow-callback
export default forwardRef<HTMLDivElement, ButtonProps>(function Button(
  {
    type = 'default',
    size = 'basic',
    text,
    children,
    icon,
    className,
    style,
    onClick,
  },
  ref,
) {
  const isText = ['string', 'number'].includes(typeof children)
  const buttonStyle = {
    default: 'bg-white text-text hover:bg-light-500 border',
    primary: 'bg-brand-gradient text-white hover:bg-brand text-blue-4',
  }
  const sizeStyle = {
    basic: 'text-14px py-2',
    sm: 'text-12px py-1.6',
    md: 'text-16px py-2.4',
  }

  return (
    <div
      className={cn(
        'button flex-center px-4 rounded-full leading-1em transition-colors duration-300 cursor-pointer',
        buttonStyle[type],
        sizeStyle[size],
        className,
      )}
      style={style}
      ref={ref}
      onClick={onClick}
    >
      {icon && <Icon icon={icon} className="mr-1 icon text-1.2em" />}
      {text && !children && <span className="relative -top-2px">{text}</span>}
      {children && (!isText ? children : <span>{children}</span>)}
    </div>
  )
})

export interface ButtonProps {
  type?: 'default' | 'primary'
  size?: 'sm' | 'basic' | 'md'
  text?: string
  children?: React.ReactNode
  icon?: string
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}
