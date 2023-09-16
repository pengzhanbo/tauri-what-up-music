import { Icon } from '@iconify/react'
import { memo } from 'react'

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {}

const genIcon = (icon: string) => {
  const IconInternal = memo(function IconInternal(props: IconProps) {
    const { className, ...rest } = props
    return (
      <span className={`icon ${className}`} {...rest}>
        <Icon icon={icon} color="currentcolor" />
      </span>
    )
  })
  IconInternal.displayName = 'Icon'
  return IconInternal
}

export default genIcon
