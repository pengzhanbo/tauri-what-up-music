import { createContext } from 'react'

export interface SwipeContextValue {
  index: number
  currentIndex: number
  total: number
  setCurrentIndex: (index: number) => void
}

const SwipeContext = createContext<SwipeContextValue>({
  index: 0,
  currentIndex: 0,
  total: 0,
  setCurrentIndex: () => {},
})

export default SwipeContext
