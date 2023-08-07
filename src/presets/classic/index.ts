import { ClassicPreset, Scope } from 'rete'
import { classicConnectionPath, getDOMSocketPosition, loopConnectionPath, SocketPositionWatcher } from 'rete-render-utils'
import Vue, { DefineComponent, VueConstructor } from 'vue'

import { Position } from '../../types'
import { RenderPreset } from '../types'
import Connection from './components/Connection.vue'
import ConnectionWrapper from './components/ConnectionWrapper.vue'
import Control from './components/Control.vue'
import Node from './components/Node.vue'
import Socket from './components/Socket.vue'
import { ClassicScheme, ExtractPayload, VueArea2D } from './types'

export { default as Connection } from './components/Connection.vue'
export { default as Control } from './components/Control.vue'
export { default as Node } from './components/Node.vue'
export { default as Socket } from './components/Socket.vue'

type Component<Props extends Record<string, any>> =
  | VueConstructor<Vue<Record<string, any>, Props>>
  | DefineComponent<Props, any, any, any, any, any, any, any, any, any, any>

type CustomizationProps<Schemes extends ClassicScheme> = {
  node?: (data: ExtractPayload<Schemes, 'node'>) => Component<any> | null
  connection?: (data: ExtractPayload<Schemes, 'connection'>) => Component<any> | null
  socket?: (data: ExtractPayload<Schemes, 'socket'>) => Component<any> | null
  control?: (data: ExtractPayload<Schemes, 'control'>) => Component<any> | null
}
type ClassicProps<Schemes extends ClassicScheme, K> = {
  socketPositionWatcher?: SocketPositionWatcher<Scope<never, [K]>>,
  customize?: CustomizationProps<Schemes>
}

/**
 * Classic preset for rendering nodes, connections, controls and sockets.
 */
export function setup<Schemes extends ClassicScheme, K extends VueArea2D<Schemes>>(
  props?: ClassicProps<Schemes, K>
): RenderPreset<Schemes, K> {
  const positionWatcher = typeof props?.socketPositionWatcher === 'undefined'
    ? getDOMSocketPosition<Schemes, K>()
    : props?.socketPositionWatcher
  const { node, connection, socket, control } = props?.customize || {}

  return {
    attach(plugin) {
      positionWatcher.attach(plugin as unknown as Scope<never, [K]>)
    },
    update(context, plugin) {
      const { payload } = context.data
      const parent = plugin.parentScope()

      if (!parent) throw new Error('parent')
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
    // eslint-disable-next-line max-statements, complexity
    render(context, plugin) {
      const parent = plugin.parentScope()
      const emit = parent.emit.bind(parent)

      if (context.data.type === 'node') {
        const component = node ? node(context.data) : Node

        return component && {
          component, props: {
            data: context.data.payload,
            emit
          }
        }
      } else if (context.data.type === 'connection') {
        const component = connection ? connection(context.data) : Connection
        const { payload } = context.data
        const { source, target, sourceOutput, targetInput } = payload

        return component && {
          component: ConnectionWrapper, props: {
            data: context.data.payload,
            component,
            start: context.data.start || ((change: any) => positionWatcher.listen(source, 'output', sourceOutput, change)),
            end: context.data.end || ((change: any) => positionWatcher.listen(target, 'input', targetInput, change)),
            path: async (start: Position, end: Position) => {
              const response = await plugin.emit({ type: 'connectionpath', data: { payload, points: [start, end] } })

              if (!response) return ''

              const { path, points } = response.data
              const curvature = 0.3

              if (!path && points.length !== 2) throw new Error('cannot render connection with a custom number of points')
              if (!path) return payload.isLoop
                ? loopConnectionPath(points as [Position, Position], curvature, 120)
                : classicConnectionPath(points as [Position, Position], curvature)

              return path
            }
          }
        }
      } else if (context.data.type === 'socket') {
        const { payload } = context.data
        const component = socket ? socket(context.data) : Socket

        return {
          component, props: {
            data: payload
          }
        }
      } else if (context.data.type === 'control') {
        const { payload } = context.data

        if (control) {
          const component = control(context.data)

          return component && {
            component, props: {
              data: payload
            }
          }
        }

        return context.data.payload instanceof ClassicPreset.InputControl
          ? {
            component: Control, props: {
              data: payload
            }
          }
          : null
      }
    }
  }
}
