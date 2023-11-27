import { chunk } from '@pengzhanbo/utils'
import { useMemo } from 'react'
import useSwr from 'swr'
import Content from './Content'
import { getRecommendPodcast } from '~/apis'
import LazyImage from '~/components/LazyImage'
import Loading from '~/components/Loading'

/**
 * 播客
 */
export default function Podcast() {
  const { isLoading, data } = useSwr('discover/recommend/podcast', () =>
    getRecommendPodcast())

  const chunkList = useMemo(() => {
    const list = data?.result || []
    return chunk(list, 3)
  }, [data])

  if (isLoading)
    return <Loading className="h-170px" />

  return (
    <Content title="播客">
      <div className="grid grid-cols-2 gap-14 pb-8">
        {chunkList.map((chunk, i) => (
          <div key={i} className="border-b border-b-gray-100">
            {chunk.map(item => (
              <section key={item.id} className="border-t border-t-gray-100">
                <div className="flex-center cursor-default rounded-md py-3 pr-4 transition-colors duration-300 -mx-4 hover:bg-gray-100">
                  <LazyImage
                    className="ml-4 h-24 w-24 cursor-pointer overflow-hidden border rounded-md"
                    src={item.picUrl}
                  />
                  <div className="flex-1 pl-4 pr-4">
                    <p className="line-clamp-1 cursor-pointer text-text-dark">
                      {item.name}
                    </p>
                    <p className="line-clamp-3 cursor-pointer pt-2 text-sm text-text-light hover:text-text">
                      {item.program.dj?.brand || item.copywriter}
                    </p>
                  </div>
                </div>
              </section>
            ))}
          </div>
        ))}
      </div>
    </Content>
  )
}
