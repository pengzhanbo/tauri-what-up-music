import cn from 'classnames'
import { Fragment } from 'react'

export default function Artists({ artists, className }: ArtistsProps) {
  const len = artists.length
  return (
    <p className={cn('truncate', className)}>
      {artists.map((item, i) => (
        <Fragment key={item.id}>
          <Artist {...item} />
          {len - 1 !== i && <span className="mx-0.5">/</span>}
        </Fragment>
      ))}
    </p>
  )
}

export function Artist({ id, name }: ArtistProps) {
  const hasId = id && id > 0
  return (
    <span className={cn(hasId ? 'text-text-light cursor-pointer' : '')}>
      {name}
    </span>
  )
}

export interface ArtistProps {
  id: number | null
  name: string
}

export interface ArtistsProps {
  artists: ArtistProps[]
  className?: string
}
