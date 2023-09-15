import { useMemoizedFn } from 'ahooks'
import { useEffect, useRef } from 'react'

export const useScrollBottom = <T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  onBottom: () => void = () => {},
  options?: { bottom?: number },
) => {
  const { bottom = 0 } = options || {}
  const isScrollBottom = useRef(false)
  const onBottomFn = useMemoizedFn(onBottom)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = (e: Event) => {
      const target = e.target as HTMLDivElement
      const st = target.scrollTop
      const sh = target.scrollHeight
      const ch = target.clientHeight
      if (st + ch >= sh - bottom && sh > ch && !isScrollBottom.current) {
        isScrollBottom.current = true
        onBottomFn?.()
      } else {
        isScrollBottom.current = false
      }
    }
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [ref, bottom])
}
