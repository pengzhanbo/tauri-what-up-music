export default class EventEmitter {
  private events: Record<string, Function[]>
  constructor() {
    this.events = {}
  }

  on(event: string, callback: Function) {
    this.events[event] = this.events[event] || []
    this.events[event].push(callback)
  }

  emit(event: string, ...args: any[]) {
    this.events[event]?.forEach((fn) => fn(...args))
  }

  off(event: string, callback: Function) {
    this.events[event] = this.events[event]?.filter((fn) => fn !== callback)
  }

  once(event: string, callback: Function) {
    const fn = (...args: any[]) => {
      callback(...args)
      this.off(event, fn)
    }
    this.on(event, fn)
  }
}
