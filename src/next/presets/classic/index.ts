import { ClassicPreset } from 'rete'
import { AreaPlugin } from 'rete-area-plugin'
import { useDOMSocketPosition } from 'rete-render-utils'
import { Component } from 'vue'

import { ClassicScheme, ExtractPayload, SocketPositionWatcher, VueArea2D } from '../../types'
import { RenderPreset } from '../types'
import Connection from './components/Connection.vue'
import ConnectionWrapper from './components/ConnectionWrapper.vue'
import Control from './components/Control.vue'
import Node from './components/Node.vue'
import Socket from './components/Socket.vue'

export { default as Connection } from './components/Connection.vue'
export { default as Control } from './components/Control.vue'
export { default as Node } from './components/Node.vue'
export { default as Socket } from './components/Socket.vue'

type CustomizationProps<Schemes extends ClassicScheme> = {
    node?: (data: ExtractPayload<Schemes, 'node'>) => typeof Node | null
    connection?: (data: ExtractPayload<Schemes, 'connection'>) => typeof Connection | null
    socket?: (data: ExtractPayload<Schemes, 'socket'>) => typeof Socket | null
    control?: <N extends ClassicPreset.Control>(data: ExtractPayload<Schemes, 'control'>)
        => ((props: { data: N }) => Component) | null
}
type ClasssicProps<Schemes extends ClassicScheme> = (
    | { socketPositionWatcher: SocketPositionWatcher }
    | { area: AreaPlugin<Schemes, VueArea2D<Schemes>>}
) & {
    customize?: CustomizationProps<Schemes>
}

export function setup<Schemes extends ClassicScheme>(
    props: ClasssicProps<Schemes>
): RenderPreset<Schemes, VueArea2D<Schemes>> {
    const socketPositionWatcher = 'socketPositionWatcher' in props
        ? props.socketPositionWatcher
        : useDOMSocketPosition(props.area)
    const { node, connection, socket, control } = props.customize || {}

    return {
        update(context, plugin) {
            const { payload } = context.data
            const parent = plugin.parentScope()
            const emit = parent.emit.bind(parent)

            if (context.data.type === 'node') {
                return { data: payload, emit }

            } else if (context.data.type === 'connection') {
                const { start, end } = context.data

                return {
                    data: payload,
                    ...(start ? { start } : {}),
                    ...(end ? { end } : {})
                }
            }
            return { data: payload }
        },
        // eslint-disable-next-line max-statements
        render(context, plugin) {
            const { payload } = context.data
            const parent = plugin.parentScope()
            const emit = parent.emit.bind(parent)

            if (context.data.type === 'node') {
                const component = node ? node(context.data) : Node

                return component && { component, props: {
                    data: payload,
                    emit
                } }
            } else if (context.data.type === 'connection') {
                const component = connection ? connection(context.data) : Connection
                const { start, end } = context.data
                const { source, target, sourceOutput, targetInput } = context.data.payload
                const watch = socketPositionWatcher

                return component && { component: ConnectionWrapper, props: {
                    data: payload,
                    component,
                    start: start || ((change: any) => watch(source, 'output', sourceOutput, change)),
                    end: end || ((change: any) => watch(target, 'input', targetInput, change))
                } }
            } else if (context.data.type === 'socket') {
                const component = socket ? socket(context.data) : Socket

                return { component, props: {
                    data: payload
                } }
            } else if (context.data.type === 'control') {
                if (control) {
                    const component = control(context.data)

                    return component && { component, props: {
                        data: payload
                    } }
                }

                return context.data.payload instanceof ClassicPreset.InputControl
                    ? { component: Control, props: {
                        data: payload
                    } }
                    : null
            }
        }
    }
}
