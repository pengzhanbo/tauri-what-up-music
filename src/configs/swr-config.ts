import type { SWRConfiguration } from 'swr'
import { appStoreHelper } from '~/modules/db'

export const swrConfig = {
  provider: localStorageProvider,
  dedupingInterval: 1000 * 5 * 60,
  revalidateOnFocus: false,
  refreshInterval: 0,
  revalidateIfStale: false,
  revalidateOnReconnect: false,
} as SWRConfiguration

const map = appStoreHelper()
const EXPIRES_KEY = 'app-swr-cache-expires'

function localStorageProvider() {
  let cacheExpires = Number(localStorage.getItem(EXPIRES_KEY) || 0)
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

    localStorage.setItem(EXPIRES_KEY, cacheExpires.toString())
    map.clear()
  }

  if (expired()) resetCache()

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
    },
    delete: (key: string) => {
      map.delete(key)
    },
    keys: () => {
      return map.keys()
    },
  }
}
