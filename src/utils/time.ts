export function formatDuration(duration: number) {
  duration = Math.floor(duration / 1000)
  const minute = Math.floor(duration / 60)
  const second = duration % 60
  return `${minute < 10 ? '0' : ''}${minute}:${second < 10 ? '0' : ''}${second}`
}
