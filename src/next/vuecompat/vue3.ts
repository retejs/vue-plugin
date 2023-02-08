// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { createApp, h } from 'vue'

export function create(element: any, component: any, payload: any, onRendered: any) {
    const app = createApp({
        props: ['data'],
        render() {
            return h(component, this.data)
        },
        mounted() {
            onRendered()
        },
        updated() {
            onRendered()
        }
    }, { data: payload })

    app.mount(element)

    return app
}

export function update(app: any, payload: any) {
    if (app._instance) {
        const proxy = app._instance.proxy
        const props = app ._instance.props

        props.data = { ...props.data, ...payload }

        if (!proxy) throw new Error('cannot update')
        proxy.$forceUpdate()
    }
}

export function destroy(app: any) {
    app.unmount()
}
