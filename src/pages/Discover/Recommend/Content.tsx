import { Icon } from '@iconify/react'

export default function Content({ title, titleClick, children }: ContentProps) {
  const handleTitleClick = () => {
    titleClick?.()
  }
  return (
    <div className="pt-6">
      <h3 className="m-0 inline-block flex items-center font-medium text-text-darker">
        <span className="cursor-pointer" onClick={handleTitleClick}>
          {title}
        </span>
        <span
          className="relative icon cursor-pointer text-2xl -top-1px"
          onClick={handleTitleClick}
        >
          <Icon icon="eva:arrow-ios-forward-fill" />
        </span>
      </h3>
      <div className="pt-4">{children}</div>
    </div>
  )
}

export interface ContentProps {
  title?: string
  titleClick?: () => void
  children?: React.ReactNode
}
