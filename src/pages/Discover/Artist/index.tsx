/**
 * 发现音乐 / 歌手
 */
import { Icon } from '@iconify/react'
import { useMemoizedFn } from 'ahooks'
import { useMemo, useRef, useState } from 'react'
import useSwrInfinite from 'swr/infinite'
import type { GetArtistListResponse } from '~/apis'
import { getArtistList } from '~/apis'
import LazyImage from '~/components/LazyImage'
import Loading from '~/components/Loading'
import Rectangle from '~/components/Rectangle'
import SelectMenu from '~/components/SelectMenu'
import {
  artistAreaOptions,
  artistConditionOptions,
  artistTypeOptions,
} from '~/constants'
import { useScrollBottom } from '~/hooks'

const limit = 30

export default function Artist() {
  const [type, setType] = useState(artistTypeOptions[0].value)
  const [area, setArea] = useState(artistAreaOptions[0].value)
  const [initial, setInitial] = useState(artistConditionOptions[0].value)
  const ref = useRef(null)
  const isUpdating = useRef(false)

  const { data, setSize, isLoading } = useSwrInfinite(
    page => [
      'artists/list',
      { limit, offset: page * limit, type, area, initial },
    ],
    ([, params]) => getArtistList(params),
    { onSuccess: () => (isUpdating.current = false) },
  )

  const artists = useMemo(() => {
    const artists: GetArtistListResponse['artists'] = []
    data?.forEach(item => artists.push(...item.artists))
    return artists
  }, [data])

  useScrollBottom(ref, () => {
    if (isUpdating.current)
      return
    isUpdating.current = true
    setSize(size => size + 1)
  })

  const updateArea = useMemoizedFn((area: string) => {
    setArea(area)
    setSize(1)
  })

  const updateType = useMemoizedFn((type: string) => {
    setType(type)
    setSize(1)
  })

  const updateInitial = useMemoizedFn((initial: string) => {
    setInitial(initial)
    setSize(1)
  })

  return (
    <div
      className="h-full w-full transform-gpu overflow-y-auto scroll-smooth px-8 py-6 will-change-scroll"
      ref={ref}
    >
      <SelectMenu
        title="语种"
        current={area}
        list={artistAreaOptions}
        onClick={updateArea}
      />
      <SelectMenu
        title="分类"
        current={type}
        list={artistTypeOptions}
        onClick={updateType}
      />
      <SelectMenu
        title="筛选"
        current={initial}
        list={artistConditionOptions}
        onClick={updateInitial}
      />
      <div className="grid grid-cols-5 w-full gap-5 pt-6">
        {artists.map(item => (
          <section key={item.id} className="pb-4">
            <Rectangle className="cursor-pointer overflow-hidden border rounded-md">
              <LazyImage src={item.img1v1Url} className="h-full w-full" />
            </Rectangle>
            <p className="flex items-center justify-between pt-1">
              <span className="cursor-pointer text-sm text-text-dark">
                {item.name}
              </span>
              {item.accountId && (
                <span className="relative top-2px h-16px w-16px flex-center cursor-pointer rounded-full bg-brand text-10px text-white">
                  <Icon icon="octicon:person-16" className="m-auto" />
                </span>
              )}
            </p>
          </section>
        ))}
      </div>
      {(isUpdating.current || isLoading) && <Loading className="h-100px" />}
    </div>
  )
}
