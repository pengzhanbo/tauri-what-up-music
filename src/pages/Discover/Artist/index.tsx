/**
 * 发现音乐 / 歌手
 */
import type { UIEventHandler } from 'react'
import { useState } from 'react'
import { useSWRConfig } from 'swr'
import useSwrInfinite from 'swr/infinite'
import Condition from './Condition'
import type { GetArtistListResponse } from '~/apis'
import { getArtistList } from '~/apis'
import LazyImage from '~/components/LazyImage'
import Rectangle from '~/components/Rectangle'
import {
  artistAreaOptions,
  artistConditionOptions,
  artistTypeOptions,
} from '~/constants'

let isUpdating = false

export default function Artist() {
  const [type, setType] = useState(artistTypeOptions[0].value)
  const [area, setArea] = useState(artistAreaOptions[0].value)
  const [initial, setInitial] = useState(artistConditionOptions[0].value)

  const { data, setSize, isLoading, mutate } = useSwrInfinite(
    (page) => {
      return [
        'artists/list',
        {
          limit: 30,
          offset: page * 30,
          type,
          area,
          initial,
        },
      ]
    },
    ([, params]) => getArtistList(params),
    {
      onSuccess: () => {
        isUpdating = false
      },
    },
  )

  const { cache } = useSWRConfig()

  console.log(cache)

  const artists: GetArtistListResponse['artists'] = []
  data?.forEach((item) => {
    artists.push(...item.artists)
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

  return (
    <div
      className="translate-gpu h-full w-full overflow-y-auto scroll-smooth px-8 py-6 will-change-scroll"
      onScroll={handleScroll}
    >
      <Condition
        title="语种"
        current={area}
        list={artistAreaOptions}
        onChange={(area) => {
          mutate(undefined, { revalidate: true })
          setArea(area)
          setSize(0)
        }}
      />
      <Condition
        title="分类"
        current={type}
        list={artistTypeOptions}
        onChange={(type) => {
          setType(type)
          setSize(0)
          mutate(undefined, { revalidate: true })
        }}
      />
      <Condition
        title="筛选"
        current={initial}
        list={artistConditionOptions}
        onChange={(initial) => {
          setInitial(initial)
          setSize(0)
          mutate(undefined, { revalidate: true })
        }}
      />
      <div className="grid grid-cols-4 w-full gap-5 pt-6">
        {artists.map((item) => (
          <section key={item.id} className="overflow-hidden rounded-md">
            <Rectangle>
              <LazyImage src={item.picUrl} className="h-full w-full" />
            </Rectangle>
            <p>{item.name}</p>
          </section>
        ))}
      </div>
      {isLoading && <div className="pt-6 text-center">加载中...</div>}
    </div>
  )
}
