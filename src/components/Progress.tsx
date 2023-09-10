import { type MouseEventHandler, useEffect } from 'react'

function Progress({
  total = 0,
  current = 0,
  preload = total,
  onChange,
}: ProgressProps) {
  const progressWidth = getPercent(current, total)
  const preloadWidth = getPercent(preload, total)

  const handleProgress: MouseEventHandler = (e) => {
    const x = e.pageX
    const cw = document.documentElement.clientWidth
    const percent = x / cw
    onChange?.(percent)
  }
  let isMouseDown = false
  const handleMouseDown = () => {
    isMouseDown = true
  }
  useEffect(() => {
    const handleMouseMove = (e: any) => {
      if (isMouseDown) handleProgress(e)
    }
    const handleMouseUp = () => {
      isMouseDown = false
    }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  })

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
            className="absolute h-12px w-12px rounded-full bg-brand opacity-0 shadow-sm -right-6px -top-5px group-hover:opacity-100"
            onMouseDown={handleMouseDown}
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
