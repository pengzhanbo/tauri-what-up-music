import { Icon } from '@iconify/react'
import { useState } from 'react'
import useSwr from 'swr'
import SubNav from './SubNav'
import { getNewTopSong } from '~/apis'
import Artists from '~/components/Artists'
import Button from '~/components/Button'
import LazyImage from '~/components/LazyImage'
import { topSongAreaList } from '~/constants'
import { formatDuration } from '~/utils'

export default function NewSongs() {
  const [area, setArea] = useState(topSongAreaList[0].value)
  return (
    <>
      <SubNav options={topSongAreaList} current={area} onClick={setArea}>
        <Button type="primary" size="sm" icon="octicon:play-24">
          播放全部
        </Button>
        <Button size="sm" icon="heroicons-outline:folder-add" className="ml-2">
          收藏全部
        </Button>
      </SubNav>
      <Songs area={area} />
    </>
  )
}

function Songs({ area }: { area: string }) {
  const { data, isLoading } = useSwr(
    ['discover/latestMusic/top-songs', area],
    ([, type]) => getNewTopSong({ type }),
  )

  if (isLoading)
    return <div className="h-170px w-full text-center">加载中...</div>

  const list = (data?.data || []).map((item, i) => ({
    id: item.id,
    name: item.name,
    picUrl: item.album.picUrl,
    duration: formatDuration(item.duration),
    artists: item.artists,
    trans: (item.transNames || []).join('/'),
    mvid: item.mvid,
    album: item.album,
    no: i + 1 < 10 ? `0${i + 1}` : i + 1,
  }))

  return (
    <div className="pb-6 pt-2 -mx-8">
      {list.map((item) => (
        <section
          key={item.id}
          className="h-24 w-full flex cursor-default items-center pl-8 odd:bg-gray-50"
        >
          <p className="pr-4 text-sm text-text-lighter">{item.no}</p>
          <div className="relative h-17 w-17 overflow-hidden rounded-md">
            <LazyImage src={item.picUrl} className="h-full w-full" />
          </div>
          <div className="w-1px flex flex-1 items-center pl-4 pr-2">
            <div className="max-w-full flex items-center">
              <p className="line-clamp-1 text-text-dark">{item.name}</p>
              {item.trans && (
                <p className="line-clamp-1 px-1 text-text-light">
                  ({item.trans})
                </p>
              )}
            </div>
            {item.mvid > 0 && (
              <span className="ml-1 icon cursor-pointer text-brand">
                <Icon icon="octicon:video-16" />
              </span>
            )}
          </div>
          <div className="w-36 pr-2 text-sm">
            <Artists artists={item.artists} />
          </div>
          <div className="line-clamp-1 w-50 cursor-pointer pr-2 text-sm text-text-light-dark">
            {item.album.name}
          </div>
          <div className="w-20 pr-8 text-right text-sm text-text-light">
            {item.duration}
          </div>
        </section>
      ))}
    </div>
  )
}
