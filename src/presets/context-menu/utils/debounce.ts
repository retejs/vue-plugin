export function debounce(delay: number, cb: () => void) {
  return {
    timeout: null as null | number,
    cancel() {
      if (this.timeout) {
        window.clearTimeout(this.timeout)
        this.timeout = null
      }
    },
    call() {
      this.timeout = window.setTimeout(() => {
        cb()
      }, delay)
    }
  }
}
