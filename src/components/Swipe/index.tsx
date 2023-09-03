import { useInterval } from 'ahooks'
import cn from 'classnames'
import { useState } from 'react'
import SwipeContext from './swipeContext'

export default function Swipe({ children }: SwipeProps) {
  const items = (children as React.ReactNode[]) || []
  const total = items.length
  const dots = new Array(total).fill(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [interval, setInterval] = useState<number | undefined>(5000)

  useInterval(() => {
    setCurrentIndex((i) => (i + 1) % total)
  }, interval)

  const setIndex = (i: number) => {
    setInterval(undefined)
    setCurrentIndex(i)
    requestAnimationFrame(() => setInterval(5000))
  }

  return (
    <div className="w-full">
      <div className="group relative h-200px w-full">
        {items.map((item, i) => {
          return (
            <SwipeContext.Provider
              key={i}
              value={{
                index: i,
                currentIndex,
                total,
                setCurrentIndex: setIndex,
              }}
            >
              {item}
            </SwipeContext.Provider>
          )
        })}
      </div>
      <div className="flex items-center justify-center pt-4">
        {total &&
          dots.map((_, i) => (
            <span
              key={i}
              className={cn(
                'mx-1.5 h-2 w-2 cursor-pointer rounded-full text-white',
                i === currentIndex ? 'bg-brand' : 'bg-gray-300',
              )}
              onClick={() => setIndex(i)}
            ></span>
          ))}
      </div>
    </div>
  )
}

export interface SwipeProps {
  children?: React.ReactNode
}
