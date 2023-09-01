import { Icon } from '@iconify/react'
import cn from 'classnames'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

function SidebarItem({
  text,
  icon,
  suffix,
  link,
  active,
  children,
}: SidebarItemProps) {
  const className = cn(
    'flex-center px-4 py-2.8 transition-colors duration-300',
    {
      'bg-sidebar-active': active,
      'text-brand': active,
    },
  )
  const navigate = useNavigate()
  const linkTo = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    e.preventDefault()
    link && navigate(link)
  }
  return (
    <div className={className}>
      {icon && (
        <span className="icon text-xl">
          <Icon icon={icon} />
        </span>
      )}
      <p
        className="m-0 w-1px flex-1 cursor-pointer text-ellipsis px-2 text-13px font-medium"
        onClick={linkTo}
      >
        {children || text}
      </p>
      {suffix && <span className="ml-2">{suffix}</span>}
    </div>
  )
}

export interface SidebarItemProps {
  text?: string
  icon?: string
  suffix?: ReactNode
  link?: string
  active?: boolean
  children?: ReactNode
}

export default SidebarItem
