import type { SWRConfiguration } from 'swr'

export const swrConfig = {
  provider: localStorageProvider,
  dedupingInterval: 1000 * 5 * 60,
  revalidateOnFocus: false,
  refreshInterval: 0,
  revalidateIfStale: false,
  revalidateOnReconnect: false,
} as SWRConfiguration

function localStorageProvider() {
  const map = new Map<string, any>(
    JSON.parse(localStorage.getItem('app-swr-cache') || '[]'),
  )
  let cacheExpires = Number(localStorage.getItem('app-swr-cache-expires') || 0)
  const expired = () => Date.now() > cacheExpires
  const resetCache = () => {
    const current = new Date()
    cacheExpires = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate(),
      23,
      59,
      59,
    ).getTime()
    localStorage.removeItem('app-swr-cache')
    localStorage.setItem('app-swr-cache-expires', cacheExpires.toString())
    map.clear()
  }

  if (expired()) resetCache()

  const update = () => {
    const appCache = JSON.stringify(Array.from(map.entries()))
    localStorage.setItem('app-swr-cache', appCache)
  }

  return {
    get: (key: string) => {
      if (expired()) {
        resetCache()
        return
      }
      return map.get(key)
    },
    set: (key: string, value: any) => {
      map.set(key, value)
      update()
    },
    delete: (key: string) => {
      map.delete(key)
      update()
    },
    keys: () => map.keys(),
  }
}
