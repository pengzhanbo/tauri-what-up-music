import cn from 'classnames'
import { useEffect, useRef, useState } from 'react'
import {
  IconArrowDownDouble,
  IconArrowUpDouble,
  IconHelp,
} from '~/components/Icons'
import { usePlayer } from '~/hooks'
import { scrollTo } from '~/utils'

let isUserScrolling = false
let scrollTimer: any

function scrolling() {
  isUserScrolling = true
  scrollTimer && clearTimeout(scrollTimer)
  scrollTimer = setTimeout(() => {
    isUserScrolling = false
  }, 5000)
}

export default function MusicLyric() {
  const { playerState, player } = usePlayer()
  const { lyric } = playerState
  const scrollRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const to = (top: number) =>
      scrollTo(top, { getContainer: () => scrollRef.current! })
    const ch = scrollRef.current?.clientHeight || 0
    const move = (ch * 3) / 5
    const heightList = Array.from(scrollRef.current?.children || []).map(
      el =>
        (el as HTMLParagraphElement).offsetHeight
        + (el as HTMLParagraphElement).offsetTop,
    )
    let oldIndex = -1
    let oldSt = scrollRef.current?.scrollTop || 0
    const scrollLyric = () => {
      if (player.paused())
        return
      const currentTime = player.seek() * 1000
      const st = scrollRef.current?.scrollTop || 0
      let index = 0
      while (index < lyric.length) {
        const _i = index + 1 > lyric.length ? lyric.length : index + 1
        if (!lyric[_i] || lyric[_i].timestamp >= currentTime)
          break
        index++
      }
      if (
        index !== oldIndex
        && !isUserScrolling
        && oldSt >= st
        && oldSt <= st + ch
      ) {
        setActive(index)
        oldIndex = index
        oldSt = heightList[index]
        to(oldSt - move)
      }
      requestAnimationFrame(scrollLyric)
    }
    let isReplay = false
    const onPlay = () => {
      if (isReplay) {
        isReplay = false
        to(0)
        oldSt = 0
      }
      scrollLyric()
    }
    const onEnd = () => {
      isReplay = true
    }

    if (!player.player.paused)
      scrollLyric()

    player.player.on('play', onPlay)
    player.player.on('ended', onEnd)

    return () => {
      player.player.off('play', onPlay)
      player.player.off('ended', onEnd)
    }
  }, [lyric, player])

  return (
    <div className="h-1px flex flex-1 pt-8">
      <div
        className="lyric-content h-full flex-1 overflow-y-scroll scroll-unset border-r text-text-light-dark"
        ref={scrollRef}
        onWheel={scrolling}
      >
        {lyric.map((line, index) => (
          <p
            key={index}
            className={cn(
              'text-14px leading-20px select-auto',
              !line.text ? 'h-22px' : 'mb-4 last-of-type:mb-0',
              active === index ? 'font-600 text-text-darker text-16px' : '',
            )}
          >
            {line.text}
          </p>
        ))}
      </div>
      <LyricControl
        onBack={() => player.seek(player.seek() - 0.5)}
        onGo={() => player.seek(player.seek() + 0.5)}
      />
    </div>
  )
}

function LyricControl({
  onBack,
  onGo,
  onHelp,
}: {
  onBack?: () => void
  onGo?: () => void
  onHelp?: () => void
}) {
  const classes
    = 'h-6 w-6 flex-center rounded-full bg-black/8 text-xl text-white hover:bg-black/12 outline-none border-none'
  return (
    <div className="flex flex-col justify-between pl-3">
      <div>
        <button className={classes} onClick={onBack}>
          <IconArrowUpDouble />
        </button>
        <button className={`${classes} mt-3`} onClick={onGo}>
          <IconArrowDownDouble />
        </button>
      </div>
      <button className={classes} onClick={onHelp}>
        <IconHelp />
      </button>
    </div>
  )
}
