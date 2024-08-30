import Vue, { ComponentOptions } from 'vue'

import { type Props } from './../index'

export function create(element: any, component: any, payload: any, onRendered: any, props?: Props) {
  const context: ComponentOptions<Vue> & { payload?: Record<string, unknown> } = {
    props: ['payload'],
    render(h) {
      return h(component, { props: { ...this.payload, seed: Math.random() }, ref: 'child' })
    },
    mounted() {
      onRendered()
    },
    updated() {
      onRendered()
    }
  }

  const app: Vue & { payload?: Record<string, unknown> } = props?.setup
    ? props.setup(context) as Vue
    : new Vue(context)

  app.payload = payload

  const container = document.createElement('div')

  if (container) {
    element.appendChild(container)
  }

  app.$mount(container || element)

  return app
}

export function update(app: any, payload: any) {
  app.payload = { ...app.payload, ...payload }

  app.$refs.child.$forceUpdate()
}

export function destroy(app: any) {
  app.$destroy()
  app.$el.remove()
}
