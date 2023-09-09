import { Store } from './tauri-store'

export const fetchStore = new Store('.what-up-music-store-fetch-data.db')

/**
 * 歌曲信息缓存
 */
export const songStore = new Store('.what-up-music-store-song.db')
