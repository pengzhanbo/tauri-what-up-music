import type { ReactNode } from 'react'

function SidebarList({ children, title }: SidebarListProps) {
  return (
    <div className="pb-4 last-of-type:pb-0">
      {title && (
        <div className="text-text-light px-4 py-1 text-sm font-bold">
          {title}
        </div>
      )}
      {children}
    </div>
  )
}

export interface SidebarListProps {
  title?: string
  children: ReactNode
}

export default SidebarList
