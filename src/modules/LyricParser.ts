import type { LyricItem } from '~/typing/Song'

const RE_TIME = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?\]([^]*)/

export default function lyricParser(lyricString: string) {
  const raw = lyricString.split('\n')

  const result: LyricItem[] = []

  for (const str of raw) {
    const match = RE_TIME.exec(str)
    if (match) {
      const timestamp =
        Number(match[1]) * 60 * 1000 +
        Number(match[2]) * 1000 +
        Number(match[3]) * 10
      const text = match[4]
      result.push({
        timestamp,
        text,
      })
    } else if (str[0] === '{') {
      try {
        const meta = JSON.parse(str)
        const timestamp = meta.t || 0
        const text = meta.c?.map((c: any) => c.tx) || []
        result.push({
          timestamp,
          text:
            text.length === 0
              ? ''
              : text.length === 1
              ? text[0]
              : `${text[0]}${text.slice(1).join('/')}`,
        })
      } catch {}
    }
  }
  return result
}
