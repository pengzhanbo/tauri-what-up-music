import { Icon } from '@iconify/react'
import { useState } from 'react'
import useSwr from 'swr'
import SubNav from './SubNav'
import { getNewAlbumList } from '~/apis'
import type { NewAlbum as AlbumItem } from '~/apis'
import LazyImage from '~/components/LazyImage'
import Loading from '~/components/Loading'
import Rectangle from '~/components/Rectangle'
import SelectMenu from '~/components/SelectMenu'
import { albumAreaList, albumTypeList } from '~/constants'

export default function NewAlbum() {
  const [area, setArea] = useState(albumAreaList[0].value)
  const [type, setType] = useState(albumTypeList[0].value)
  return (
    <>
      <SubNav options={albumAreaList} current={area} onClick={setArea}>
        <SelectMenu
          className="-mr-2"
          list={albumTypeList}
          current={type}
          onClick={setType}
        />
      </SubNav>
      <Albums area={area} type={type} />
    </>
  )
}

function Albums({ area, type }: { area: string; type: string }) {
  const d = new Date()
  const currentMonth = d.getMonth() + 1

  const [date] = useState({
    month: d.getMonth() + 1,
    year: d.getFullYear(),
  })
  const { isLoading, data } = useSwr(
    () => ['discover/latestMusic/top-songs', { area, type, ...date }],
    ([, params]) => getNewAlbumList(params),
  )

  if (isLoading) return <Loading className="pt-6" />

  const weekData = data?.weekData || []
  const monthData = data?.monthData || []

  return (
    <div className="pt-6">
      {weekData.length && currentMonth === date.month && (
        <div className="flex items-start pb-6">
          <div className="sticky top-0 mr-6 w-35px text-16px text-text-darker">
            本周新碟
          </div>
          <AlbumContent list={weekData} />
        </div>
      )}
      <div className="flex items-start pb-6">
        <div className="sticky top-0 mr-6 w-35px text-center text-text-darker">
          <p className="text-28px">
            {date.month < 10 ? `0${date.month}` : date.month}
          </p>
          <p className="text-13px -mt-2px">{date.year}</p>
        </div>
        <AlbumContent list={monthData} />
      </div>
    </div>
  )
}

function AlbumContent({ list }: { list: AlbumItem[] }) {
  return (
    <div className="grid grid-cols-4 flex-1 gap-5">
      {list.map((item) => (
        <section key={item.id} className="group relative pb-4">
          <Rectangle size="80%" className="cursor-pointer">
            <LazyImage
              src={item.picUrl}
              transparent
              className="relative z-3 h-full w-full overflow-hidden rounded-md"
            />
            <div className="absolute top-3px z-2 h-45% w-6px border-r border-gray-500 rounded-rb-md rounded-rt-md border-r-solid -right-3px"></div>
            <div className="absolute bottom-3px z-2 h-45% w-6px border-r border-gray-500 rounded-rb-md rounded-rt-md border-r-solid -right-3px"></div>
            <div
              className="absolute top-0 z-1 h-full w-full rounded-full bg-cover -right-25px"
              style={{ backgroundImage: 'url(/bg-album.tiff)' }}
            ></div>
            <span className="absolute left-50% top-50% z-3 icon h-12 w-12 flex-center cursor-pointer rounded-full bg-white/40 text-2xl text-brand opacity-0 backdrop-blur-9 transition -translate-50% group-hover:opacity-100">
              <Icon icon="iconamoon:player-play-fill" />
            </span>
          </Rectangle>
          <div className="w-85% pt-2">
            <p className="line-clamp-2 text-13px text-text-light-dark">
              {item.name}
            </p>
            <p className="pt-1 text-sm text-text-light">{item.artist.name}</p>
          </div>
        </section>
      ))}
    </div>
  )
}
