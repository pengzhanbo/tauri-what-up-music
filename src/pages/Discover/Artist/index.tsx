/**
 * 发现音乐 / 歌手
 */
import { Icon } from '@iconify/react/dist/iconify.js'
import type { UIEventHandler } from 'react'
import { useState } from 'react'
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

let isUpdating = false

export default function Artist() {
  const [type, setType] = useState(artistTypeOptions[0].value)
  const [area, setArea] = useState(artistAreaOptions[0].value)
  const [initial, setInitial] = useState(artistConditionOptions[0].value)

  const { data, setSize, isLoading } = useSwrInfinite(
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
      className="h-full w-full transform-gpu overflow-y-auto scroll-smooth px-8 py-6 will-change-scroll"
      onScroll={handleScroll}
    >
      <SelectMenu
        title="语种"
        current={area}
        list={artistAreaOptions}
        onClick={(area) => {
          // mutate(undefined, { revalidate: true })
          setArea(area)
          setSize(1)
        }}
      />
      <SelectMenu
        title="分类"
        current={type}
        list={artistTypeOptions}
        onClick={(type) => {
          setType(type)
          setSize(1)
        }}
      />
      <SelectMenu
        title="筛选"
        current={initial}
        list={artistConditionOptions}
        onClick={(initial) => {
          setInitial(initial)
          setSize(1)
        }}
      />
      <div className="grid grid-cols-5 w-full gap-5 pt-6">
        {artists.map((item) => (
          <section key={item.id} className="pb-4">
            <Rectangle className="cursor-pointer overflow-hidden rounded-md">
              <LazyImage src={item.img1v1Url} className="h-full w-full" />
            </Rectangle>
            <p className="item-center flex justify-between pt-1">
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
      {isLoading && <Loading className="h-100px" />}
    </div>
  )
}
