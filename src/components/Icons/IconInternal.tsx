import { Icon } from '@iconify/react'
import { forwardRef, memo } from 'react'

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {}

const genIcon = (icon: string) => {
  const IconInternal = memo(
    forwardRef<HTMLSpanElement, IconProps>(function IconInternal(props, ref) {
      // eslint-disable-next-line react/prop-types
      const { className, ...rest } = props
      return (
        <span className={`icon ${className}`} {...rest} ref={ref}>
          <Icon icon={icon} color="currentcolor" />
        </span>
      )
    }),
  )
  IconInternal.displayName = 'Icon'
  return IconInternal
}

export default genIcon
