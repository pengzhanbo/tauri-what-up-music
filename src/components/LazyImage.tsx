import { useInViewport } from 'ahooks'
import cn from 'classnames'
import { useRef, useState } from 'react'

const cache = new Map<
  string,
  [() => Promise<string>, Promise<string> | null, string]
>()

const useLazyImage = (src: string) => {
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
    })
  }

  return { blob, ref }
}

export default function LazyImage({
  src,
  alt,
  className,
  style,
}: LazyImageProps) {
  const { blob, ref } = useLazyImage(src)

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

export interface LazyImageProps {
  src: string
  alt?: string
  className?: string
  style?: React.CSSProperties
}
