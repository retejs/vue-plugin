import Vue from 'vue'

export function create(element: any, component: any, payload: any, onRendered: any) {
  const app = new Vue({
    props: ['payload'],
    render(h) {
      return h(component, { props: this.payload })
    },
    mounted() {
      onRendered()
    },
    updated() {
      onRendered()
    }
  })

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

  app.$forceUpdate()
}

export function destroy(app: any) {
  app.$destroy()
  app.$el.remove()
}
