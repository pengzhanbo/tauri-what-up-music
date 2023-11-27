/**
 * 独家放送
 */
import { Icon } from '@iconify/react'
import { useMemo } from 'react'
import useSwr from 'swr'
import Content from './Content'
import { getPersonalizedPrivateContent } from '~/apis'
import LazyImage from '~/components/LazyImage'
import Rectangle from '~/components/Rectangle'

export default function PrivateContent() {
  const { isLoading, data } = useSwr('discover/recommend/private-content', () =>
    getPersonalizedPrivateContent())

  const list = useMemo(() => data?.result || [], [data])

  if (isLoading)
    return null

  return (
    <Content title="独家放送">
      <div className="grid grid-cols-4 gap-5 pb-8">
        {list.map(item => (
          <section key={item.id}>
            <Rectangle
              ratio={0.5625}
              className="cursor-pointer overflow-hidden border rounded-md"
            >
              <LazyImage className="h-full w-full" src={item.sPicUrl} />
              <span className="absolute left-2 top-2 icon h-7 w-7 flex-center border border-white/50 rounded-full bg-black bg-opacity-30 text-white">
                <Icon icon="iconamoon:player-play" />
              </span>
            </Rectangle>
            <p className="line-clamp-2 mt-1 text-13px leading-relaxed text-text-dark">
              <span className="cursor-pointer">{item.name}</span>
            </p>
          </section>
        ))}
      </div>
    </Content>
  )
}
