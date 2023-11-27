import EventEmitter from './Events'
import type { NotNullable } from '~/typing'

const mimeTypes = [
  'audio/flac',
  'audio/mpeg',
  'audio/mp4',
  'audio/ogg',
  'audio/aac',
  'audio/x-ms-wma',
  'audio/x-aiff',
  'audio/webm',
]

export interface AudioPlayerOptions {
  source: string
  startTime?: number
  playWhenReady?: boolean
  onload?: HTMLAudioElement['onload']
  onerror?: HTMLAudioElement['onerror']
  onpause?: HTMLAudioElement['onpause']
  onplay?: HTMLAudioElement['onplay']
  onplaying?: HTMLAudioElement['onplaying']
  onseeked?: HTMLAudioElement['onseeked']
  /**
   * 音量发生变化时， 范围在 0 ~ 1
   * @param volume 当前音量
   */
  onvolume?: (volume: number) => void
  onend?: HTMLAudioElement['onended']
  onprogress?: (current: number, total: number) => void
  oncanplay?: HTMLAudioElement['oncanplay']
  oncanplaythrough?: HTMLAudioElement['oncanplaythrough']
  ontimeupdate?: (currentTime: number) => void
  onwaiting?: HTMLAudioElement['onwaiting']
}

export default class AudioPlayer extends EventEmitter {
  player!: HTMLAudioElement
  options!: AudioPlayerOptions

  private playableMimeTypes: string[]
  constructor() {
    super()

    this.options = {
      source: '',
      startTime: 0,
    }
    this.playableMimeTypes = []
    this.initialize()
  }

  set(options: AudioPlayerOptions) {
    this.player.src = options.source
    this.player.currentTime = options.startTime || 0
    this.options = options

    this.player.load()
    // this.player.onloadeddata = () => options.playWhenReady && this.player.play()
  }

  get paused() {
    return this.player.paused
  }

  play() {
    this.player.play()
  }

  pause() {
    this.player.pause()
  }

  seek(time: number) {
    this.currentTime = time
  }

  get currentTime() {
    return this.player.currentTime
  }

  set currentTime(time: number) {
    this.player.currentTime = time
  }

  get duration() {
    return this.player.duration
  }

  get volume() {
    return this.player.volume
  }

  set volume(value: number) {
    this.player.volume = value
  }

  private initialize() {
    const _audio = document.getElementById('audio-player')
    if (_audio)
      _audio.remove()
    const audio = document.createElement('audio')
    audio.id = 'audio-player'
    audio.style.display = 'none'
    document.body.appendChild(audio)
    this.player = audio

    this.player.addEventListener('load', this.emitLoad.bind(this))
    this.player.addEventListener('error', this.emitError.bind(this))
    this.player.addEventListener('pause', this.emitPause.bind(this))
    this.player.addEventListener('play', this.emitPlay.bind(this))
    this.player.addEventListener('playing', this.emitPlaying.bind(this))
    this.player.addEventListener('seeked', this.emitSeeked.bind(this))
    this.player.addEventListener('volumechange', this.emitVolume.bind(this))
    this.player.addEventListener('ended', this.emitEnded.bind(this))
    this.player.addEventListener('progress', this.emitProgress.bind(this))
    this.player.addEventListener('canplay', this.emitCanplay.bind(this))
    this.player.addEventListener(
      'canplaythrough',
      this.emitCanplaythrough.bind(this),
    )
    this.player.addEventListener('timeupdate', this.emitTimeupdate.bind(this))
    this.player.addEventListener('waiting', this.emitWaiting.bind(this))

    mimeTypes.forEach((mt) => {
      const canPlay = this.player.canPlayType(mt)
      if (canPlay)
        this.playableMimeTypes.push(mt)
    })
  }

  private emitLoad(
    ...args: Parameters<NotNullable<HTMLAudioElement['onload']>>
  ) {
    this.options.onload?.call(this.player, ...args)
    this.emit('load', ...args)
  }

  private emitError(
    ...args: Parameters<NotNullable<HTMLAudioElement['onerror']>>
  ) {
    console.warn('error', args[0])
    this.options.onerror?.call(this.player, ...args)
    this.emit('error', ...args)
  }

  private emitPause(
    ...args: Parameters<NotNullable<HTMLAudioElement['onpause']>>
  ) {
    this.options.onpause?.call(this.player, ...args)
    this.emit('pause', ...args)
  }

  private emitPlay(
    ...args: Parameters<NotNullable<HTMLAudioElement['onplay']>>
  ) {
    this.options.onplay?.call(this.player, ...args)
    this.emit('play', ...args)
  }

  private emitPlaying(
    ...args: Parameters<NotNullable<HTMLAudioElement['onplaying']>>
  ) {
    this.options.onplaying?.call(this.player, ...args)
    this.emit('playing', ...args)
  }

  private emitSeeked(
    ...args: Parameters<NotNullable<HTMLAudioElement['onseeked']>>
  ) {
    this.options.onseeked?.call(this.player, ...args)
    this.emit('seeked', ...args)
  }

  private emitVolume(
    ...args: Parameters<NotNullable<HTMLAudioElement['onvolumechange']>>
  ) {
    this.options.onvolume?.call(this.player, this.player.volume)
    this.emit('volume', ...args)
  }

  private emitEnded(
    ...args: Parameters<NotNullable<HTMLAudioElement['onended']>>
  ) {
    this.options.onend?.call(this.player, ...args)
    this.emit('ended', ...args)
  }

  private emitProgress(
    ...args: Parameters<NotNullable<HTMLAudioElement['onprogress']>>
  ) {
    const lastBufferTime = this.getLastBufferedTime()
    this.options.onprogress?.call(this.player, lastBufferTime, this.duration)
    this.emit('progress', ...args, lastBufferTime, this.duration)
  }

  private emitCanplay(
    ...args: Parameters<NotNullable<HTMLAudioElement['oncanplay']>>
  ) {
    this.options.oncanplay?.call(this.player, ...args)
    this.emit('canplay', ...args)
  }

  private emitCanplaythrough(
    ...args: Parameters<NotNullable<HTMLAudioElement['oncanplaythrough']>>
  ) {
    this.options.oncanplaythrough?.call(this.player, ...args)
    this.emit('canplaythrough', ...args)
  }

  private emitTimeupdate(
    ...args: Parameters<NotNullable<HTMLAudioElement['ontimeupdate']>>
  ) {
    this.options.ontimeupdate?.call(this.player, this.currentTime)
    // 在播放过程中,如果有缓冲,则触发progress
    // 播放过程中的缓冲检查预计比较精确
    if (this.isValidDuration(this.duration)) {
      const lastBufferTime = this.getLastBufferedTime()
      if (lastBufferTime <= this.duration) {
        this.options.onprogress?.call(
          this.player,
          lastBufferTime,
          this.duration,
        )
        this.emit('progress', lastBufferTime)
      }
    }
    this.emit('timeupdate', ...args, this.currentTime)
  }

  private emitWaiting(
    ...args: Parameters<NotNullable<HTMLAudioElement['onwaiting']>>
  ) {
    this.options.onwaiting?.call(this.player, ...args)
    this.emit('waiting', ...args)
  }

  private isValidDuration(duration: number) {
    if (
      duration
      && !Number.isNaN(duration)
      && duration !== Number.POSITIVE_INFINITY
      && duration !== Number.NEGATIVE_INFINITY
    )
      return true

    return false
  }

  private getBufferedRanges() {
    if (!this.player)
      return []
    const ranges = []
    const seekable = this.player.buffered || []

    const offset = 0

    for (let i = 0, length = seekable.length; i < length; i++) {
      let start = seekable.start(i)
      let end = seekable.end(i)
      if (!this.isValidDuration(start))
        start = 0

      if (!this.isValidDuration(end)) {
        end = 0
        continue
      }

      ranges.push({
        start: start + offset,
        end: end + offset,
      })
    }
    return ranges
  }

  private getLastBufferedTime() {
    const bufferedRanges = this.getBufferedRanges()
    if (!bufferedRanges.length)
      return 0

    const buff = bufferedRanges.find(
      buff =>
        buff.start < this.player.currentTime
        && buff.end > this.player.currentTime,
    )
    if (buff)
      return buff.end

    const last = bufferedRanges[bufferedRanges.length - 1]
    return last.end
  }
}
