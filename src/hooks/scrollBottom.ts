import { useEffect } from 'react'

export const useScrollBottom = <T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  onBottom?: () => void,
  options?: { bottom?: number },
) => {
  const { bottom = 0 } = options || {}
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = (e: Event) => {
      const target = e.target as HTMLDivElement
      const st = target.scrollTop
      const sh = target.scrollHeight
      const ch = target.clientHeight
      if (
        st + ch >= sh - bottom &&
        sh > ch &&
        !el.hasAttribute('is-scroll-bottom')
      ) {
        el.setAttribute('is-scroll-bottom', 'true')
        onBottom?.()
      } else {
        el.removeAttribute('is-scroll-bottom')
      }
    }
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [ref, bottom])
}
