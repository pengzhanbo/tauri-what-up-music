/**
 * 懒加载图片资源
 */
import { useInViewport } from 'ahooks'
import cn from 'classnames'
import { memo, useRef, useState } from 'react'

export type CacheMapItem = [
  () => Promise<string>,
  Promise<string> | null,
  string,
]
const cache = new Map<string, CacheMapItem>()

const IdleCallback =
  window.requestIdleCallback || ((fn) => setTimeout(fn, 1000))
let timer: any
function checkCache() {
  let current!: CacheMapItem
  // 每次检查只取一个进行处理
  for (const key of cache.keys()) {
    const _cached = cache.get(key)!
    if (!_cached[1]) {
      current = _cached
      break
    }
  }
  if (current) {
    timer && clearInterval(timer)
    current[1] = current[0]()
    current[1]
      .then((blob) => {
        current[2] = blob
      })
      .finally(() => {
        // 仅在空闲的时候处理
        IdleCallback(checkCache)
      })
  } else {
    timer = setInterval(checkCache, 10000)
  }
}

// IdleCallback(checkCache)

const useLazyImage = (src: string, update: (blob: string) => void) => {
  const [blob, setBlob] = useState<string>()
  const [waiting, setWaiting] = useState(false)
  const ref = useRef(null)
  const [inViewport] = useInViewport(ref, {
    rootMargin: '200px',
  })

  if (cache.has(src)) {
    const cached = cache.get(src)!
    if (cached[2]) return { blob: cached[2], ref }
  } else {
    cache.set(src, [
      () =>
        fetch(src)
          .then((res) => res.blob())
          .then((blob) => URL.createObjectURL(blob)),
      null,
      '',
    ])
  }

  const cached = cache.get(src)!

  if (inViewport && !cached[2] && !blob && !waiting) {
    setWaiting(true)
    if (!cached[1]) {
      cached[1] = cached[0]()
    }
    cached[1].then((url) => {
      setBlob(url)
      cached[2] = url
      setTimeout(() => update(url), 400)
    })
  }

  return { blob, ref }
}

const SyncLazyImage = memo(function SyncLazyImage({
  src,
  alt,
  className,
  style,
}: LazyImageProps) {
  return (
    <div style={style} className={className}>
      <div
        aria-label={alt}
        className="h-full w-full bg-cover"
        style={{ backgroundImage: `url(${src})` }}
      />
    </div>
  )
})

function AsyncLazyImage({
  src,
  alt,
  className,
  style,
  setBlob,
}: LazyImageProps & { setBlob: (blob: string) => void }) {
  const { blob, ref } = useLazyImage(src, setBlob)

  return (
    <div ref={ref} style={style} className={` bg-gray-50 ${className}`}>
      <div
        aria-label={alt}
        className={cn(
          'w-full h-full transition-opacity duration-300 will-change-opacity bg-cover',
          blob ? 'opacity-100' : 'opacity-0',
        )}
        style={blob ? { backgroundImage: `url(${blob})` } : {}}
      />
    </div>
  )
}

export default function LazyImage(props: LazyImageProps) {
  const { src, ...other } = props
  const cached = cache.get(src)
  const [blob, setBlob] = useState(cached ? cached[2] : '')
  /**
   * 如果有缓存的 图片 blob 资源，则直接渲染为一个带缓存的静态节点。
   * 否则使用带异步加载图片的组件，等待图片出现在视窗后进行加载，
   * 加载完成，并完成动画过渡显示图片后，替换为 静态节点，删除对节点的监听。
   * 避免在多图场景下，同时监听多个元素变化造成卡顿现象。
   */
  return blob ? (
    <SyncLazyImage src={blob} {...other} />
  ) : (
    <AsyncLazyImage {...props} setBlob={setBlob} />
  )
}

export interface LazyImageProps {
  src: string
  alt?: string
  className?: string
  style?: React.CSSProperties
}
