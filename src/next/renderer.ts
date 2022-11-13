import { App, createApp, h } from 'vue-demi'

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
            const app = createApp({
                props: ['data'],
                render() {
                    return h(vueComponent, this.data)
                },
                mounted() {
                    onRendered()
                },
                updated() {
                    onRendered()
                }
            }, { data: payload })

            app.mount(element)
            instances.set(element, app)

            return app
        },
        update(app, payload) {
            if (app._instance) {
                const proxy = app._instance.proxy
                const props = app._instance.props

                props.data = { ...props.data as any, ...payload }

                if (!proxy) throw new Error('cannot update')
                proxy.$forceUpdate()
            }
        },
        unmount(element) {
            const app = instances.get(element)

            if (app) {
                app.unmount()
                instances.delete(element)
            }
        }
    }
}
