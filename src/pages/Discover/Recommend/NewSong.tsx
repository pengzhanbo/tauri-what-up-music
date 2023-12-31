import { Icon } from '@iconify/react'
import { chunk } from '@pengzhanbo/utils'
import cn from 'classnames'
import { useMemo, useState } from 'react'
import useSwr from 'swr'
import Content from './Content'
import { getRecommendNewSong } from '~/apis'
import Artists from '~/components/Artists'
import LazyImage from '~/components/LazyImage'
import PlayerPlayFill from '~/components/PlayerPlayFill'
import { usePlayer } from '~/hooks'

export default function NewSong() {
  const { isLoading, data } = useSwr('discover/recommend/new-song', () =>
    getRecommendNewSong())
  const [selectId, setSelectId] = useState<number>(0)

  const chunkList = useMemo(() => {
    const list = (data?.result || []).map((item, i) => ({
      id: item.id,
      name: item.name,
      sort: i + 1 < 10 ? `0${i + 1}` : (i + 1).toString(),
      alias: item.song.alias.join('/'),
      picUrl: item.picUrl,
      artists: item.song.artists,
      hasMv: item.song.mvid > 0,
      tag: item.song.hrMusic ? 'Hi-Res' : item.song.sqMusic ? 'SQ' : '',
    }))
    return chunk(list, data?.category || 5)
  }, [data])

  const { loadSong } = usePlayer()

  if (isLoading)
    return null

  return (
    <Content title="最新音乐">
      <div className="grid grid-cols-2 gap-14 pb-8">
        {chunkList.map((chunk, i) => (
          <div key={i} className="border-b border-b-gray-100">
            {chunk.map(item => (
              <section
                key={item.id}
                className="border-t border-t-gray-100"
                onClick={() => setSelectId(item.id)}
                onDoubleClick={() => loadSong(item.id)}
              >
                <div
                  className={cn(
                    'flex-center cursor-default rounded-md py-3 pr-4 transition-colors duration-300 -mx-4 hover:bg-gray-100',
                    item.id === selectId ? 'bg-gray-100' : 'bg-transparent',
                  )}
                >
                  <div
                    className="relative ml-4 h-17 w-17 flex cursor-pointer overflow-hidden border rounded-md"
                    onClick={() => loadSong(item.id)}
                  >
                    <LazyImage className="h-full w-full" src={item.picUrl} />
                    <PlayerPlayFill blur="light" size="smaller" hover={false} />
                  </div>
                  <span className="px-3 text-sm text-text-light">
                    {item.sort}
                  </span>
                  <div className="flex-1 pr-4">
                    <p className="line-clamp-1">
                      <span className="text-text-dark">{item.name}</span>
                      {item.alias && (
                        <span className="text-text-light">
                          （
                          {item.alias}
                          ）
                        </span>
                      )}
                    </p>
                    <div className="flex items-center pt-1">
                      {item.tag && (
                        <span className="relative top-1px mr-1 inline-block border border-origin rounded-sm text-sm leading-1em text-origin">
                          {item.tag}
                        </span>
                      )}
                      <Artists
                        className="w-1px flex-1 text-sm"
                        artists={item.artists}
                      />
                    </div>
                  </div>
                  {item.hasMv && (
                    <span className="mr-4 icon text-brand">
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
