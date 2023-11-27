import { Icon } from '@iconify/react'
import { useClickAway } from 'ahooks'
import cn from 'classnames'
import { forwardRef, useCallback, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import type { GetHighQualityPlayListResponse } from '~/apis'
import Button from '~/components/Button'
import LazyImage from '~/components/LazyImage'
import Loading from '~/components/Loading'
import PopoverBeacon from '~/components/PopoverBeacon'
import {
  usePageNavigate,
  usePlayListHighQuality,
  usePlayListHighQualityTags,
  useScrollBottom,
} from '~/hooks'

interface CatListProps {
  cat: string
  show: boolean
  onChange: (cat: string) => void
}

const CatList = forwardRef<HTMLDivElement, CatListProps>((
  { cat, show, onChange },
  ref,
) => {
  const { isLoading, tags } = usePlayListHighQualityTags()

  if (isLoading)
    return null

  return (
    <CSSTransition
      nodeRef={ref}
      in={show}
      timeout={300}
      unmountOnExit
      classNames="fade"
    >
      <div
        className="absolute right-8 top-60px z-1 w-550px rounded-md bg-white py-4 shadow-box"
        ref={ref}
      >
        <PopoverBeacon offset={-25} />
        <div className="border-b px-4 pb-4">
          <span
            className="inline-block h-32px cursor-pointer rounded-16px px-4 leading-32px"
            onClick={() => onChange('')}
          >
            全部歌单
          </span>
        </div>
        <div className="grid grid-cols-5 gap-4 px-6 py-6 text-13px font-400 text-text-dark">
          {tags.map(tag => (
            <div
              key={`${tag.id}${tag.name}`}
              className="cursor-pointer pb-1 hover:text-brand"
            >
              <p
                className={cn(
                  'relative inline-block text-13px h-32px rounded-16px px-4 leading-32px cursor-pointer transition',
                  tag.name === cat
                    ? 'text-brand bg-brand-lighter'
                    : 'hover:text-text-dark bg-transparent',
                )}
                onClick={() => onChange(tag.name)}
              >
                <span>{tag.name}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </CSSTransition>
  )
})

CatList.displayName = 'CatList'

interface PlaylistContentProps {
  list: GetHighQualityPlayListResponse['playlists']
}

function PlaylistContent({ list }: PlaylistContentProps) {
  const { goPlayListDetail } = usePageNavigate()
  return (
    <div className="grid grid-cols-2 gap-4 pt-2">
      {list.map(item => (
        <div key={item.id} className="flex-center pb-2">
          <div
            className="group relative h-140px w-140px cursor-pointer overflow-hidden border rounded-md"
            onClick={() => goPlayListDetail(item.id)}
          >
            <LazyImage src={item.coverImgUrl} className="h-full w-full" />
            <p className="absolute h-20px w-50px flex-center bg-king text-12px text-white -left-18px -top-2px -rotate-45">
              <span className="icon">
                <Icon icon="fa6-regular:chess-queen" />
              </span>
            </p>
            <p className="absolute right-0 top-1 flex-center pr-2 text-sm text-white text-shadow-md">
              <span className="relative top-2px mr-1 icon">
                <Icon icon="iconamoon:player-play" />
              </span>
              <span>{item.playCount}</span>
            </p>
            <span className="absolute bottom-2 right-2 icon h-10 w-10 flex-center rounded-full bg-white/60 text-2xl text-brand opacity-0 transition group-hover:opacity-100">
              <Icon icon="iconamoon:player-play-fill" />
            </span>
          </div>
          <div className="flex-1 pl-2">
            <p
              className="line-clamp-1 cursor-pointer text-text-dark hover:text-text-darker"
              onClick={() => goPlayListDetail(item.id)}
            >
              {item.name}
            </p>
            <p className="my-4 text-12px text-text-light">
              <span className="mr-2">by</span>
              <span className="cursor-pointer">{item.creator.nickname}</span>
              <span
                className="ml-2 inline-block h-4 w-4 bg-cover"
                style={{
                  backgroundImage: `url(${item.creator?.avatarDetail?.identityIconUrl})`,
                }}
              >
              </span>
            </p>
            <p className="flex items-center">
              {item.tag && (
                <span className="inline-block border border-brand rounded-sm px-2px text-10px leading-10px text-brand">
                  {item.tag}
                </span>
              )}
              {item.copywriter && (
                <span className="relative line-clamp-1 flex-1 pl-1 text-sm text-text-light -top-1px">
                  {item.copywriter}
                </span>
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function HighQualityPlayList() {
  const [searchParams] = useSearchParams({ cat: '' })
  const [cat, setCat] = useState(searchParams.get('cat') || '')
  const [show, setShow] = useState(false)
  const btnRef = useRef(null)
  const catRef = useRef(null)
  const scrollRef = useRef(null)

  useClickAway(() => setShow(false), [btnRef, catRef])

  const { playlist, setSize, isUpdating, hasMore } = usePlayListHighQuality(cat)

  useScrollBottom(scrollRef, () => {
    if (isUpdating.current)
      return
    if (!hasMore.current)
      return
    setSize(size => size + 1)
  })

  const updateCat = useCallback((cat: string) => {
    setCat(cat)
    setSize(1)
    setShow(false)
  }, [setSize])

  return (
    <div
      className="relative h-full w-full transform-gpu overflow-y-auto scroll-smooth px-8 py-6 will-change-scroll"
      ref={scrollRef}
    >
      <div className="items-top flex justify-between">
        <p>
          <span className="text-16px text-text-dark">精品歌单</span>
        </p>
        <Button
          type="default"
          icon="cil:filter"
          size="sm"
          ref={btnRef}
          onClick={() => setShow(s => !s)}
        >
          {cat || '筛选'}
        </Button>
      </div>
      <CatList cat={cat} show={show} ref={catRef} onChange={updateCat} />
      <PlaylistContent list={playlist as any} />
      {isUpdating.current && <Loading className="h-100px" />}
    </div>
  )
}
