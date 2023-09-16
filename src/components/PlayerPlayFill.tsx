import cn from 'classnames'
import { memo } from 'react'
import type { IconProps } from './Icons'
import { IconPlayFill } from './Icons'

export interface PlayerPlayFillProps extends IconProps {
  size?: 'normal' | 'small' | 'smaller'
  position?: 'center' | 'rb'
  blur?: 'dark' | 'light' | 'lighter'
  hover?: boolean
}

export default memo(function PlayerPlayFill(props: PlayerPlayFillProps) {
  const {
    size = 'normal',
    position = 'center',
    className,
    blur = 'light',
    hover = true,
    ...rest
  } = props
  const classes = cn(
    'absolute  z-3 flex-center cursor-pointer rounded-full text-brand backdrop-blur-9',
    {
      'left-50% top-50% -translate-50%': position === 'center',
      'bottom-2 right-2': position === 'rb',
      'h-12 w-12 text-2xl': size === 'normal',
      'h-9 w-9 text-xl': size === 'small',
      'h-7 w-7': size === 'smaller',
      'bg-white/30': blur === 'dark',
      'bg-white/40': blur === 'light',
      'bg-white/60': blur === 'lighter',
    },
    hover ? 'opacity-0 group-hover:opacity-100 transition duration-300' : '',
    className,
  )
  return <IconPlayFill className={classes} {...rest} />
})
