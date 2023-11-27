/**
 * 最新MV
 */
import { Icon } from '@iconify/react'
import { useMemo } from 'react'
import useSwr from 'swr'
import Content from './Content'
import { getRecommendMV } from '~/apis'
import Artists from '~/components/Artists'
import LazyImage from '~/components/LazyImage'
import Rectangle from '~/components/Rectangle'
import { numUnit } from '~/utils'

export default function NewMV() {
  const { isLoading, data } = useSwr('discover/recommend/new-mv', () =>
    getRecommendMV())
  const list = useMemo(() => data?.result || [], [data])

  if (isLoading)
    return null

  return (
    <Content title="最新MV">
      <div className="grid grid-cols-4 gap-5 pb-8">
        {list.map(item => (
          <section key={item.id}>
            <Rectangle
              ratio={0.5625}
              className="group cursor-pointer overflow-hidden border rounded-md"
            >
              <p className="absolute right-0 top-0 z-1 flex-center pr-2 text-sm text-white opacity-100 transition-opacity duration-300 group-hover:opacity-0">
                <span className="relative top-2px mr-1 icon">
                  <Icon icon="iconamoon:player-play" />
                </span>
                <span>{numUnit(item.playCount)}</span>
              </p>
              <p className="absolute left-0 top-0 z-1 w-full bg-black/50 px-2 py-2 text-sm text-white transition-transform duration-300 delay-300 -translate-y-100% group-hover:translate-y-0">
                {item.copywriter}
              </p>
              <LazyImage className="h-full w-full" src={item.picUrl} />
            </Rectangle>
            <p className="line-clamp-1 cursor-pointer pt-1 text-text-dark">
              {item.name}
            </p>
            <Artists artists={item.artists} className="text-sm" />
          </section>
        ))}
      </div>
    </Content>
  )
}
