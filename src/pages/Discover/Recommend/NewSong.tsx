import { Icon } from '@iconify/react'
import { chunk } from '@pengzhanbo/utils'
import cn from 'classnames'
import { useState } from 'react'
import useSwr from 'swr'
import Content from './Content'
import { getRecommendNewSong } from '~/apis'
import Artists from '~/components/Artists'

export default function NewSong() {
  const { isLoading, data } = useSwr(
    'discover/recommend/new-song',
    getRecommendNewSong,
  )
  const [selectId, setSelectId] = useState<number>(0)

  if (isLoading) return null

  const list =
    data?.result.map((item, i) => ({
      id: item.id,
      name: item.name,
      sort: i + 1 < 10 ? `0${i + 1}` : (i + 1).toString(),
      alias: item.song.alias.join('/'),
      picUrl: item.picUrl,
      artists: item.song.artists,
      hasMv: item.song.mvid > 0,
      tag: item.song.hrMusic ? 'Hi-Res' : item.song.sqMusic ? 'SQ' : '',
    })) || []

  const chunkList = chunk(list, data?.category || 5)

  return (
    <Content title="最新音乐">
      <div className="grid grid-cols-2 gap-14 pb-8">
        {chunkList.map((chunk, i) => (
          <div key={i} className="border-b border-b-gray-100">
            {chunk.map((item) => (
              <section
                key={item.id}
                className="border-t border-t-gray-100"
                onClick={() => setSelectId(item.id)}
              >
                <div
                  className={cn(
                    'flex-center cursor-default rounded-md py-3 pr-4 transition-colors duration-300 -mx-4 hover:bg-gray-100',
                    item.id === selectId ? 'bg-gray-100' : 'bg-transparent',
                  )}
                >
                  <div
                    className="ml-4 h-17 w-17 flex cursor-pointer rounded-md bg-cover"
                    style={{ backgroundImage: `url(${item.picUrl})` }}
                  >
                    <span className="icon m-auto h-7 w-7 flex-center rounded-full bg-white/50 text-brand">
                      <Icon icon="iconamoon:player-play-fill" />
                    </span>
                  </div>
                  <span className="px-3 text-sm text-text-light">
                    {item.sort}
                  </span>
                  <div className="flex-1 pr-4">
                    <p className="line-clamp-1">
                      <span className="text-text-dark">{item.name}</span>
                      {item.alias && (
                        <span className="text-text-light">
                          （{item.alias}）
                        </span>
                      )}
                    </p>
                    <p className="flex items-center pt-1">
                      {item.tag && (
                        <span className="relative top-1px mr-1 inline-block border border-origin rounded-sm text-sm leading-1em text-origin">
                          {item.tag}
                        </span>
                      )}
                      <Artists
                        className="w-1px flex-1 text-sm"
                        artists={item.artists}
                      />
                    </p>
                  </div>
                  {item.hasMv && (
                    <span className="icon mr-4 text-brand">
                      <Icon icon="octicon:video-16" />
                    </span>
                  )}
                </div>
              </section>
            ))}
          </div>
        ))}
      </div>
    </Content>
  )
}
