import { Icon } from '@iconify/react'
import cn from 'classnames'
import { useRef, useState } from 'react'

function SearchInput({
  placeholder = '搜索',
  onInPut,
  onBlur,
  onClear,
  onFocus,
}: SearchInputProps) {
  const [value, setValue] = useState('')
  const [focus, setFocus] = useState(false)
  const inputEl = useRef<HTMLInputElement>(null)
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onInPut?.(e.target.value, e)
  }
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus(true)
    onFocus?.(e.target.value, e)
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus(false)
    onBlur?.(e.target.value, e)
  }
  const handleClear = () => {
    setValue('')
    inputEl.current && (inputEl.current.value = '')
    onClear?.()
  }
  return (
    <div
      className={cn(
        'bg-search relative inline-block h-7 w-44 rounded-3.5',
        'transition-colors duration-300',
        { 'bg-search-hover': focus },
      )}
    >
      <div className="h-full w-full flex-center">
        <Icon icon="ic:baseline-search" className="text-text-1 ml-1 text-2xl" />
        <input
          className="h-full w-full border-none bg-transparent text-12px leading-7 outline-none focus-visible:outline-none focus:outline-none"
          type="text"
          ref={inputEl}
          placeholder={placeholder}
          onMouseDown={e => e.stopPropagation()}
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <Icon
          icon="ic:baseline-close"
          className={cn(
            'text-text-light mr-1 text-2xl transition-opacity duration-300 opacity-0',
            { 'opacity-100': value },
          )}
          onClick={handleClear}
        />
      </div>
    </div>
  )
}

export interface SearchInputProps {
  placeholder?: string
  onInPut?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (value: string, e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void
  onClear?: () => void
}

export default SearchInput
