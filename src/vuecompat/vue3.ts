/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { App, createApp, h, markRaw, Ref, ref } from 'vue'

type Instance<P> = { app: App<Element>, payload: Ref<P> }

export function create<P extends object>(element: HTMLElement, component: any, payload: P, onRendered: any): Instance<P> {
  const state = ref(markRaw(payload)) as Ref<P>

  const app = createApp({
    render() {
      // @ts-ignore
      return h(component, { ...state.value, seed: Math.random() })
    },
    mounted() {
      onRendered()
    },
    updated() {
      onRendered()
    }
  })

  app.mount(element)

  return {
    app,
    payload: state
  }
}

export function update<P extends object>(instance: Instance<P>, payload: P) {
  instance.payload.value = markRaw({ ...instance.payload.value, ...payload })
}

export function destroy(instance: Instance<unknown>) {
  instance.app.unmount()
}
