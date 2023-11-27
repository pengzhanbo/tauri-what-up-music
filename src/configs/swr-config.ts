import { unstable_serialize } from 'swr'
import type { SWRConfiguration } from 'swr'
import { fetchStore } from '~/modules/db'

export const swrConfig = {
  refreshInterval: 0,
  use: [
    function (useSWRNext) {
      return function (key, _fetcher, config) {
        const fetcher = async (args: any) => {
          const _key = unstable_serialize(args)
          const res = (await fetchStore.get(_key)) as any[]
          if (res) {
            const [data, expired] = res
            if (Date.now() < expired)
              return data

            else
              await fetchStore.delete(_key)
          }
          const result = await _fetcher?.(args)
          result && (await fetchStore.set(_key, [result, getExpires()]))

          return result
        }
        return useSWRNext(key, fetcher, config as any)
      }
    },
  ],
} as SWRConfiguration

function getExpires() {
  const current = new Date()
  return new Date(
    current.getFullYear(),
    current.getMonth(),
    current.getDate(),
    23,
    59,
    59,
  ).getTime()
}
