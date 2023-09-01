import cn from 'classnames'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

function Modal({ className, children, show, onClick }: ModalProps) {
  className = cn('fixed z-10 inset-0 overflow-y-auto', className)
  const handleClick = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return
    onClick && onClick()
  }
  return (
    show &&
    createPortal(
      <div className={className} onClick={handleClick}>
        {children}
      </div>,
      document.body,
    )
  )
}

export interface ModalProps {
  children: ReactNode
  className: string
  show?: boolean
  onClick?: () => void
}

export default Modal
