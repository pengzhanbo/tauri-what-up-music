import { Icon } from '@iconify/react'
import cn from 'classnames'
import { useMemo } from 'react'

export default function Pagination({ total, page, onChange }: PaginationProps) {
  const range = useMemo(() => {
    let range: { value: number | string, more?: true }[] = []
    if (total <= 0)
      return range
    if (total <= 10) {
      range = Array.from({ length: total }, (_, i) => ({ value: i + 1 }))
    }
    else {
      let i = 1
      let hasMore = false
      while (i <= total) {
        if ((page <= 5 && i <= 5) || (page >= total - 4 && i >= total - 4)) {
          hasMore = false
          range.push({ value: i })
        }
        else if (i <= 2 || i >= total - 1) {
          hasMore = false
          range.push({ value: i })
        }
        else if (
          (page > 6 || page < total - 6)
          && page - i < 3
          && i - page < 3
        ) {
          hasMore = false
          range.push({ value: i })
        }
        else if (!hasMore) {
          hasMore = true
          range.push({ value: i, more: true })
        }
        i++
      }
    }
    return range
  }, [total, page])

  if (total < 0)
    return null

  return (
    <div className="flex-center pb-30 pt-4">
      <div className="flex items-center">
        <div
          className={cn(
            'mx-0.5 w-7 h-7 leading-7 text-center rounded border',
            page === 1
              ? 'text-text-lighter'
              : 'bg-white text-text cursor-pointer',
          )}
          onClick={() => onChange(page - 1 < 1 ? 1 : page - 1)}
        >
          <Icon icon="mingcute:left-fill" />
        </div>
        {range.map(({ value, more }) => (
          <div
            key={value}
            className={cn(
              'mx-0.5 w-7 h-7 leading-7 text-center cursor-pointer rounded text-sm',
              value === page
                ? 'bg-brand text-white'
                : 'bg-white text-text border',
            )}
            onClick={() => !more && onChange(value as number)}
          >
            {more ? '...' : value}
          </div>
        ))}
        <div
          className={cn(
            'mx-0.5 w-7 h-7 leading-7 text-center rounded border',
            page === total
              ? 'text-text-lighter'
              : 'bg-white text-text cursor-pointer',
          )}
          onClick={() => onChange(page + 1 > total ? total : page + 1)}
        >
          <Icon icon="mingcute:right-fill" />
        </div>
      </div>
    </div>
  )
}

export interface PaginationProps {
  total: number
  page: number
  onChange: (page: number) => void
}
