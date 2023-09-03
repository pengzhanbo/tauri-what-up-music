/**
 * banner 资源位
 */
import useSWR from 'swr'
import type { DiscoverBannerResponseItem } from '~/apis'
import { getDiscoverBanner } from '~/apis'
import Swipe from '~/components/Swipe'
import SwipeItem from '~/components/Swipe/SwipeItem'

export default function Banner() {
  const { isLoading, data } = useSWR('discover/banner', () =>
    getDiscoverBanner(),
  )

  const handleClick = (banner: DiscoverBannerResponseItem) => {
    console.warn(banner)
  }

  return isLoading ? (
    <div className="h-220px w-full"></div>
  ) : (
    <Swipe>
      {data?.banners.map((item) => (
        <SwipeItem key={item.targetId} onClick={() => handleClick(item)}>
          <div
            className="h-200px w-full"
            style={{
              backgroundImage: `url(${item.imageUrl})`,
              backgroundSize: 'cover',
            }}
          ></div>
          <span className="absolute bottom-0 right-0 inline-block cursor-pointer rounded-lt-md bg-brand px-3 py-1.5 text-sm leading-1em text-white">
            {item.typeTitle}
          </span>
        </SwipeItem>
      ))}
    </Swipe>
  )
}
