export function localStorageProvider() {
  const map = new Map<string, any>(
    JSON.parse(localStorage.getItem('app-swr-cache') || '[]'),
  )

  const update = () => {
    const appCache = JSON.stringify(Array.from(map.entries()))
    localStorage.setItem('app-swr-cache', appCache)
  }

  return {
    get: (key: string) => map.get(key),
    set: (key: string, value: any) => {
      map.set(key, value)
      update()
    },
    delete: (key: string) => {
      map.delete(key)
      update()
    },
    keys: map.keys,
  }
}
