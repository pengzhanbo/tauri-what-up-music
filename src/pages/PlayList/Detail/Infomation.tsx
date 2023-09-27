import { Icon } from '@iconify/react'
import { Fragment, useState } from 'react'
import type { GetPlayListDetailResponse } from '~/apis'
import LazyImage from '~/components/LazyImage'

interface PlaylistInfoProps {
  playlist: GetPlayListDetailResponse['playlist'] & {
    createTimeString: string
    subscribedCountString: string
    shareCountString: string
    playCountString: string
  }
}

export default function PlaylistInfo({ playlist }: PlaylistInfoProps) {
  const [show, setShow] = useState(false)
  return (
    <div className="flex px-8">
      <div className="h-200px w-200px overflow-hidden rounded-md">
        <LazyImage src={playlist.coverImgUrl} className="h-full w-full" />
      </div>
      <div className="w-1px flex-1 pl-8">
        <div className="flex items-center">
          {playlist.highQuality && (
            <span className="mr-2 inline-block border border-brand rounded px-1 py-1 text-base leading-13px text-brand">
              精品歌单
            </span>
          )}
          <p className="line-clamp-1 flex-1 text-22px font-bold text-text-dark">
            {playlist.name}
          </p>
        </div>
        <div className="flex items-center pt-4">
          <div
            className="relative h-7 w-7 rounded-full bg-cover"
            style={{ backgroundImage: `url(${playlist.creator.avatarUrl})` }}
          >
            <div
              className="absolute bottom-0 h-12px w-12px bg-cover -right-1"
              style={{
                backgroundImage: `url(${playlist.creator.avatarDetail?.identityIconUrl})`,
              }}
            ></div>
          </div>
          <p className="ml-4 text-13px text-blue-4">
            {playlist.creator.nickname}
          </p>
          <p className="ml-4 text-sm text-text-light-dark">
            {playlist.createTimeString} 创建
          </p>
        </div>
        <div className="mb-4 mt-6 flex items-center">
          <BtnPlayAll />
          <Button
            text={`收藏(${playlist.subscribedCountString})`}
            icon="solar:add-folder-linear"
          />
          <Button text={`分享(${playlist.shareCountString})`} icon="ph:share" />
          <Button text="下载全部" icon="bi:download" />
        </div>
        <div>
          {playlist.tags.length ? (
            <p className="mt-2 flex items-center text-sm">
              <span className="w-3em flex justify-between text-text-dark">
                <i>标</i>
                <i>签</i>
              </span>
              <span className="mr-1">:</span>
              {playlist.tags.map((tag, i) => (
                <Fragment key={tag + i}>
                  <span className="mx-1 text-blue-4">{tag}</span>
                  {i < playlist.tags.length - 1 && <span>/</span>}
                </Fragment>
              ))}
            </p>
          ) : null}
          <p className="mt-2 text-sm">
            <span className="text-text-dark">歌曲数</span>
            <span className="mr-1">:</span>
            <span className="mr-6 text-text-light-dark">
              {playlist.trackIds.length}
            </span>
            <span className="text-text-dark">播放数</span>
            <span className="mr-1">:</span>
            <span className="text-text-light-dark">
              {playlist.playCountString}
            </span>
          </p>
          <div className="flex">
            <div
              className={`mt-1 w-1px flex-1 pr-2 text-sm leading-24px ${
                show ? '' : 'line-clamp-1'
              }`}
            >
              <p className="inline-block">
                <span className="w-3em flex justify-between text-text-dark">
                  <i>简</i>
                  <i>介</i>
                </span>
              </p>
              <span className="mr-1">:</span>
              {playlist.description.split('\n').map((item, i) => (
                <Fragment key={item + i}>
                  <span className="select-auto text-text-light-dark">
                    {item}
                  </span>
                  <br />
                </Fragment>
              ))}
            </div>
            <span
              className="relative top-10px icon cursor-pointer text-sm text-text-light"
              onClick={() => setShow(!show)}
            >
              <Icon icon={show ? 'bxs:up-arrow' : 'bxs:down-arrow'} />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Button({
  onClick,
  icon,
  text,
}: {
  onClick?: () => void
  icon: string
  text: string
}) {
  return (
    <div
      className="ml-2 h-30px flex cursor-default items-center overflow-hidden border rounded-full bg-transparent px-4 text-13px leading-28px hover:bg-gray-100"
      onClick={onClick}
    >
      <span className="mr-1 icon text-16px">
        <Icon icon={icon} />
      </span>
      <span>{text}</span>
    </div>
  )
}

function BtnPlayAll({
  onPlayAll,
  onAddAll,
}: {
  onPlayAll?: () => void
  onAddAll?: () => void
}) {
  return (
    <div className="h-30px flex cursor-default overflow-hidden rounded-full text-13px leading-28px text-white bg-brand-gradient">
      <div
        className="h-full flex items-center pl-5 pr-4 hover:bg-brand"
        onClick={onPlayAll}
      >
        <span className="mr-1 icon text-16px">
          <Icon icon="octicon:play-16" />
        </span>
        <span>播放全部</span>
      </div>
      <div
        className="h-full flex-center border-l border-white/10 pl-2 pr-3 hover:bg-brand"
        onClick={onAddAll}
      >
        <span className="relative icon text-xl -top-2px">
          <Icon icon="ph:plus-light" />
        </span>
      </div>
    </div>
  )
}
