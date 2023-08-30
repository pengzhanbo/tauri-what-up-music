import { invoke } from '@tauri-apps/api'

export const useWindowDrag = () => {
  return async () => await invoke('drag_window')
}
