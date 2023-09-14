import { useRef } from 'react'
import { useMouseMove } from '~/hooks'

function Progress({
  total = 0,
  current = 0,
  preload = total,
  onChange,
}: ProgressProps) {
  const progressWidth = getPercent(current, total)
  const preloadWidth = getPercent(preload, total)
  const ref = useRef<HTMLSpanElement>(null)
  const cw = document.documentElement.clientWidth
  const handleProgress = (e: React.MouseEvent) => {
    const x = e.pageX
    const percent = x / cw
    onChange?.(percent)
  }

  useMouseMove({ ref, onMouseMove: handleProgress })

  return (
    <div
      className="group absolute left-0 top-0 h-4px w-full"
      onClick={handleProgress}
    >
      <div className="relative h-2px w-full bg-gray-100">
        <div
          className="relative z-2 h-full bg-brand"
          style={{ width: progressWidth }}
        >
          <span
            className="absolute h-12px w-12px cursor-pointer rounded-full bg-brand opacity-0 shadow-sm transition-opacity -right-6px -top-5px data-[is-mouse-move]:opacity-100 group-hover:opacity-100"
            ref={ref}
          ></span>
        </div>
        <div
          className="absolute left-0 top-0 z-0 h-full bg-white"
          style={{ width: preloadWidth }}
        ></div>
      </div>
    </div>
  )
}

function getPercent(current: number, total: number) {
  const percent = total === 0 ? 0 : (current / total) * 100
  return `${(percent > 100 ? 100 : percent).toFixed(4)}%`
}

export interface ProgressProps {
  total: number
  current: number
  preload: number
  onChange?: (percent: number) => void
}

export default Progress
