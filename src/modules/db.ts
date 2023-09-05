import { Store } from './tauri-store'

export const fetchStore = new Store('.what-up-music-store-fetch-data.db')

const fetchStoreMap = new Map<string, any>()

export async function initFetchSore() {
  const entries = await fetchStore.entries()
  for (const [key, value] of entries) {
    fetchStoreMap.set(key, value)
  }
}

export const appStoreHelper = () => {
  return {
    get: (key: string) => fetchStoreMap.get(key),
    keys: () => fetchStoreMap.keys(),
    set(key: string, value: any) {
      fetchStore.set(key, value)
      fetchStoreMap.set(key, value)
    },
    delete(key: string) {
      fetchStore.delete(key)
      fetchStoreMap.delete(key)
    },
    clear() {
      fetchStoreMap.clear()
      fetchStore.clear()
    },
  }
}
