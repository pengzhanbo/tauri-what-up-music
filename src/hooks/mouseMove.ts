import { useEffect } from 'react'

export const useMouseMove = <T extends HTMLElement = HTMLElement>({
  ref,
  onMouseMove,
}: {
  ref: React.RefObject<T>
  onMouseMove?: (e: React.MouseEvent) => void
}) => {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handleMouseDown = () => {
      el.setAttribute('data-is-mouse-move', 'true')
    }
    const handleMouseMove = (e: any) => {
      if (el.hasAttribute('data-is-mouse-move')) onMouseMove?.(e)
    }
    const handleMouseUp = () => {
      el.removeAttribute('data-is-mouse-move')
    }
    el.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      el.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [ref])
}
