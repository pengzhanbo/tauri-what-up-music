import type { AudioPlayerOptions } from '~/modules/AudioPlayer'
import AudioPlayer from '~/modules/AudioPlayer'

export class Player {
  player!: AudioPlayer
  // 当前播放歌曲ID
  id?: number
  source?: string | string[]

  constructor() {
    this.player = new AudioPlayer()
  }

  create(id: number, options: AudioPlayerOptions) {
    // 避免重复创建
    if (
      id === this.id &&
      JSON.stringify(options.source) === JSON.stringify(this.source)
    )
      return
    this.id = id
    this.source = options.source

    this.player.set(options)
  }

  play() {
    this.player.play()
  }

  pause() {
    this.player.pause()
  }

  volume(value: number) {
    this.player.volume = value / 100
  }

  mute() {
    this.volume(0)
  }

  seek(seek?: number) {
    if (typeof seek !== 'undefined') {
      this.player.seek(seek)
    }
    return this.player.currentTime
  }

  paused() {
    return this.player.paused
  }

  duration() {
    return this.player.duration
  }
}

const player = new Player()

export default function getPlayerInstance() {
  return player
}
