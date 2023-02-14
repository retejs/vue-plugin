// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { create, destroy, update } from 'process.env.VUECOMPAT'

type App<T> = any & T

export type Renderer = {
  get(element: Element): App<Element> | undefined
  mount(element: Element, vueComponent: any, payload: any, onRendered: any): App<Element>
  update(app: App<Element>, payload: any): void
  unmount(element: Element): void
}

export function getRenderer(): Renderer {
  const instances = new Map<Element, App<Element>>()

  return {
    get(element) {
      return instances.get(element)
    },
    mount(element, vueComponent, payload, onRendered) {
      const app = create(element, vueComponent, payload, onRendered)

      instances.set(element, app)

      return app
    },
    update(app, payload) {
      update(app, payload)
    },
    unmount(element) {
      const app = instances.get(element)

      if (app) {
        destroy(app)
        instances.delete(element)
      }
    }
  }
}
