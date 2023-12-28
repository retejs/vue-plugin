// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { create, destroy, update } from 'process.env.VUECOMPAT'

import { type Props } from './index'

export type Renderer<I> = {
  get(element: Element): I | undefined
  mount<P>(element: Element, vueComponent: any, payload: P, onRendered: any): I
  update<P>(app: I, payload: P): void
  unmount(element: Element): void
}

export function getRenderer<I>(props?: Props): Renderer<I> {
  const instances = new Map<Element, I>()

  return {
    get(element) {
      return instances.get(element)
    },
    mount(element, vueComponent, payload, onRendered) {
      const app = create(element, vueComponent, payload, onRendered, props)

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
