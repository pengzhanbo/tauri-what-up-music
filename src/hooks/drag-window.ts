import { invoke } from '@tauri-apps/api'

const onDrag = async () => await invoke('drag_window')
export const useWindowDrag = () => {
  return onDrag
}
