import { Icon } from '@iconify/react'
import { useClickAway } from 'ahooks'
import cn from 'classnames'
import type { UIEventHandler } from 'react'
import { forwardRef, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import type {
  GetHighQualityPlayListParams,
  GetHighQualityPlayListResponse,
} from '~/apis'
import { getHighQualityPlayList, getHighQualityPlayListTags } from '~/apis'
import Button from '~/components/Button'
import LazyImage from '~/components/LazyImage'
import Loading from '~/components/Loading'
import { numUnit } from '~/utils'

const CatList = forwardRef<
  HTMLDivElement,
  {
    cat: string
    show: boolean
    onChange: (cat: string) => void
  }
>(function CatList({ cat, show, onChange }, ref) {
  const { isLoading, data } = useSWR(
    'discover/playlist/high-quality/tags',
    () => getHighQualityPlayListTags(),
  )
  if (isLoading) return null
  const tags = data?.tags || []
  const className = cn(
    'shadow-box absolute right-8 top-60px z-1 w-550px rounded-md bg-white py-4',
    show ? 'block' : 'hidden',
  )
  return (
    <div className={className} ref={ref}>
      <span className="absolute right-7 z-1 inline-block w-14px border-7px border-b-white border-l-transparent border-r-transparent border-t-transparent border-solid -top-14px"></span>
      <span className="absolute right-7 z-0 inline-block w-14px border-7px border-b-gray-100 border-l-transparent border-r-transparent border-t-transparent border-solid -top-16px"></span>
      <div className="border-b px-4 pb-4">
        <span
          className="inline-block h-32px cursor-pointer rounded-16px px-4 leading-32px"
          onClick={() => onChange('')}
        >
          全部歌单
        </span>
      </div>
      <div className="grid grid-cols-5 gap-4 px-6 py-6 text-13px font-400 text-text-dark">
        {tags.map((tag) => (
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
  )
})

function PlaylistContent({
  list,
}: {
  list: GetHighQualityPlayListResponse['playlists']
}) {
  return (
    <div className="grid grid-cols-2 gap-4 pt-2">
      {list.map((item) => (
        <div key={item.id} className="flex-center pb-2">
          <div className="group relative h-140px w-140px cursor-pointer overflow-hidden rounded-md">
            <LazyImage
              src={`${item.coverImgUrl.split('?')[0]}?param=600y600`}
              className="h-full w-full"
            />
            <p className="absolute h-20px w-50px flex-center bg-king text-12px text-white -left-18px -top-2px -rotate-45">
              <span className="icon">
                <Icon icon="fa6-regular:chess-queen" />
              </span>
            </p>
            <p className="absolute right-0 top-1 flex-center pr-2 text-sm text-white text-shadow-md">
              <span className="relative top-2px mr-1 icon">
                <Icon icon="iconamoon:player-play" />
              </span>
              <span>{numUnit(item.playCount)}</span>
            </p>
            <span className="absolute bottom-2 right-2 icon h-10 w-10 flex-center rounded-full bg-white/60 text-2xl text-brand opacity-0 transition group-hover:opacity-100">
              <Icon icon="iconamoon:player-play-fill" />
            </span>
          </div>
          <div className="flex-1 pl-2">
            <p className="line-clamp-1 cursor-pointer text-text-dark hover:text-text-darker">
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
              ></span>
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

let isUpdating = false
export default function HighQualityPlayList() {
  const [searchParams] = useSearchParams({ cat: '' })
  const [cat, setCat] = useState(searchParams.get('cat') || '')
  const [show, setShow] = useState(false)
  const btnRef = useRef(null)
  const catRef = useRef(null)

  useClickAway(() => setShow(false), [btnRef, catRef])

  const { data, isLoading, setSize } = useSWRInfinite(
    (_, preData: GetHighQualityPlayListResponse) => {
      const params: GetHighQualityPlayListParams = { cat, limit: 50 }
      if (preData) params.before = preData.lasttime
      return ['discover/playlist/high-quality', params]
    },
    ([, params]) => getHighQualityPlayList(params),
    { onSuccess: () => (isUpdating = false) },
  )

  const playlist: GetHighQualityPlayListResponse['playlists'] = []
  data?.forEach((item) => {
    playlist.push(...item.playlists)
  })

  const handleScroll: UIEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLDivElement
    const st = target.scrollTop
    const sh = target.scrollHeight
    const ch = target.clientHeight
    if (st + ch >= sh && !isUpdating && sh > ch) {
      if (!data?.[data.length - 1].more) return
      isUpdating = true
      setSize((size) => size + 1)
    }
  }

  const updateCat = (cat: string) => {
    setCat(cat)
    setSize(1)
    setShow(false)
  }

  return (
    <div
      className="relative h-full w-full transform-gpu overflow-y-auto scroll-smooth px-8 py-6 will-change-scroll"
      onScroll={handleScroll}
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
          onClick={() => setShow((s) => !s)}
        >
          {cat || '筛选'}
        </Button>
      </div>
      <CatList cat={cat} show={show} ref={catRef} onChange={updateCat} />
      <PlaylistContent list={playlist} />
      {isLoading && <Loading className="h-100px" />}
    </div>
  )
}
