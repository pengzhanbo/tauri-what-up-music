import { Icon } from '@iconify/react'
import cn from 'classnames'
import { usePlayListShortDetail } from './hooks'
import type { GetAllTopListResponseItem } from '~/apis'
import Rectangle from '~/components/Rectangle'

// S 飙升  N 新歌榜  O 原创榜 H 热歌榜

export interface OfficialListProps {
  list: GetAllTopListResponseItem[]
}

export default function OfficialList({ list }: OfficialListProps) {
  return (
    <div>
      <p className="pb-4 text-16px text-text-darker">官方榜</p>
      {list.map((item) => (
        <OfficialItem key={item.id} rank={item} />
      ))}
    </div>
  )
}

const bgColors = {
  S: 'bg-blue-6/40',
  N: 'bg-green-5/40',
  O: 'bg-yellow-6/60',
  H: 'bg-pink-6/60',
}

function OfficialItem({ rank }: { rank: GetAllTopListResponseItem }) {
  const { isLoading, rankList } = usePlayListShortDetail(rank.id)
  if (isLoading) return null

  const bgUrl = rankList[0].coverImgUrl
  const soar = rank.ToplistType === 'S'
  const news = rank.ToplistType === 'N'
  const original = rank.ToplistType === 'O'
  const hot = rank.ToplistType === 'H'
  const type = rank.ToplistType! as keyof typeof bgColors

  const updateTime = new Date(rank.updateTime)
  const m = String(updateTime.getMonth() + 1).padStart(2, '0')
  const d = String(updateTime.getDate()).padStart(2, '0')
  const updated = `${m}月${d}日更新`
  return (
    <div className="grid grid-cols-4 gap-5 pb-6">
      <section className="group pb-6">
        <Rectangle className="overflow-hidden rounded-md">
          <div
            className="h-full w-full overflow-hidden rounded-md bg-cover"
            style={{ backgroundImage: `url(${bgUrl})` }}
          ></div>
          <div
            className={cn(
              'absolute z-1 w-full h-full top-0 left-0 backdrop-blur-6',
              bgColors[type],
            )}
          ></div>
          <div className="absolute left-0 top-0 z-2 h-full w-full flex-center cursor-default">
            <div className="m-auto text-center text-white">
              <p className="text-36px">{rank.name}</p>
              <p className="text-sm">{updated}</p>
            </div>
          </div>
          <span className="absolute left-50% top-50% z-3 icon h-12 w-12 flex-center cursor-pointer rounded-full bg-white/40 text-2xl text-brand opacity-0 backdrop-blur-9 transition -translate-50% group-hover:opacity-100">
            <Icon icon="iconamoon:player-play-fill" />
          </span>
        </Rectangle>
      </section>
      <section className="col-span-3 pl-4">
        {rankList.map((item, i) => (
          <div
            key={item.id}
            className="h-33px flex cursor-pointer items-center pl-3 pr-4 text-sm transition odd:bg-light-200 hover:bg-light-600!"
          >
            <span
              className={cn(
                'text-base mr-2',
                i < 3 ? 'text-brand' : 'text-text-light',
              )}
            >
              {i + 1}
            </span>
            <p className="item-center w-7 flex">
              {soar && (
                <span className="text-8px text-text-lighter">
                  {item.ratio}%
                </span>
              )}
              {(news || hot) && (
                <span className="icon pl-1 text-center text-8px text-text-light">
                  {item.lr === i && <Icon icon="fluent:subtract-12-filled" />}
                  {item.lr < i && (
                    <Icon
                      icon="mingcute:arrow-down-fill"
                      className="text-blue-4"
                    />
                  )}
                  {item.lr > i && (
                    <Icon
                      icon="mingcute:arrow-up-fill"
                      className="text-red-7"
                    />
                  )}
                </span>
              )}
              {original && (
                <span className="icon">
                  {item.uid > 1 ? (
                    <Icon
                      icon="ic:outline-fiber-new"
                      className="text-xl text-green-5"
                    />
                  ) : (
                    <Icon
                      icon="fluent:subtract-12-filled"
                      className="text-8px text-text-light"
                    />
                  )}
                </span>
              )}
            </p>
            <p className="line-clamp-1 flex-1 pr-4">
              <span className="text-text-dark">{item.name}</span>
              {item.tns && (
                <span className="ml-1 text-text-light">{item.tns}</span>
              )}
            </p>
            <span className="text-text-light">{item.artist}</span>
          </div>
        ))}
        <div className="inline-block cursor-pointer py-2 pl-3">
          <span className="text-sm">查看全部</span>
          <span className="icon">
            <Icon icon="eva:arrow-ios-forward-fill" />
          </span>
        </div>
      </section>
    </div>
  )
}
