import { useEffect, useRef } from 'react'

export const useMouseMove = <T extends HTMLElement = HTMLElement>({
  ref,
  onMouseMove,
}: {
  ref: React.RefObject<T>
  onMouseMove?: (e: React.MouseEvent) => void
}) => {
  const isMouseMove = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handleMouseDown = () => {
      isMouseMove.current = true
      el.setAttribute('data-is-mouse-move', 'true')
    }
    const handleMouseMove = (e: any) => {
      if (isMouseMove.current) onMouseMove?.(e)
    }
    const handleMouseUp = () => {
      isMouseMove.current = false
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
