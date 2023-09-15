import { Icon } from '@iconify/react'
import cn from 'classnames'
import { useCallback, useContext } from 'react'
import SwipeContext from './swipeContext'

export default function SwipeItem({ children, onClick }: SwipeItemProps) {
  const { index, currentIndex, total, setCurrentIndex } =
    useContext(SwipeContext)
  const isSelected = index === currentIndex
  const isPrevious =
    currentIndex - index === 1 || (currentIndex === 0 && index === total - 1)
  const isNext =
    index - currentIndex === 1 || (currentIndex === total - 1 && index === 0)

  const className = cn(
    'absolute left-0 top-0 h-200px w-540px cursor-pointer overflow-hidden rounded-md',
    'transition-all duration-500 scale-0 will-change-left,transform translate-z-0',
    {
      'left-50% -translate-x-50% scale-100 z-2': isSelected,
      'left-0 z-1 translate-x-0 scale-85 origin-center-left': isPrevious,
      'left-100% z-1 -translate-x-100% scale-85 origin-center-right': isNext,
    },
  )

  const handleClick = useCallback(() => {
    if (isPrevious || isNext) {
      setCurrentIndex(index)
    } else {
      onClick?.(index)
    }
  }, [index, isPrevious, isNext, setCurrentIndex, onClick])

  return (
    <div className={className} onClick={handleClick}>
      {children}
      {!isSelected && (
        <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-30">
          <span className="absolute left-0 top-50% icon text-5xl text-gray-200 opacity-0 transition-opacity duration-300 -translate-y-50% group-hover:opacity-100">
            <Icon icon="eva:arrow-ios-back-outline" />
          </span>
          <span className="absolute right-0 top-50% icon text-5xl text-gray-200 opacity-0 transition-opacity duration-300 -translate-y-50% group-hover:opacity-100">
            <Icon icon="eva:arrow-ios-forward-fill" />
          </span>
        </div>
      )}
    </div>
  )
}

export interface SwipeItemProps {
  children: React.ReactNode
  onClick?: (index: number) => void
}
