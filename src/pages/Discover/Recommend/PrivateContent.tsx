/**
 * 独家放送
 */
import { Icon } from '@iconify/react'
import useSwr from 'swr'
import Content from './Content'
import { getPersonalizedPrivateContent } from '~/apis'
import Rectangle from '~/components/Rectangle'

export default function PrivateContent() {
  const { isLoading, data } = useSwr('discover/recommend/private-content', () =>
    getPersonalizedPrivateContent(),
  )
  if (isLoading) return null

  const list = data?.result || []

  return (
    <Content title="独家放送">
      <div className="grid grid-cols-4 gap-5 pb-8">
        {list.map((item) => (
          <section key={item.id}>
            <Rectangle
              ratio={0.5625}
              className="cursor-pointer overflow-hidden rounded-md"
            >
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: `url(${item.sPicUrl})`,
                  backgroundSize: 'cover',
                }}
              ></div>
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
