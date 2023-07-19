import { BaseSchemes, CanAssignSignal, Scope } from 'rete'

import { RenderPreset } from './presets/types'
import { getRenderer, Renderer } from './renderer'
import { Position, RenderSignal } from './types'

export * as Presets from './presets'
export type { ClassicScheme, VueArea2D } from './presets/classic/types'
export type { RenderPreset } from './presets/types'
export { default as Ref } from './Ref.vue'

/**
 * Signals that can be emitted by the plugin
 * @priority 10
 */
export type Produces<Schemes extends BaseSchemes> =
  | { type: 'connectionpath', data: { payload: Schemes['Connection'], path?: string, points: Position[] } }

type Requires<Schemes extends BaseSchemes> =
  | RenderSignal<'node', { payload: Schemes['Node'] }>
  | RenderSignal<'connection', { payload: Schemes['Connection'], start?: Position, end?: Position }>
  | { type: 'unmount', data: { element: HTMLElement } }

/**
 * Vue plugin. Renders nodes, connections and other elements using React.
 * @priority 9
 * @emits connectionpath
 * @listens render
 * @listens unmount
 */
export class VuePlugin<Schemes extends BaseSchemes, T = Requires<Schemes>> extends Scope<Produces<Schemes>, [Requires<Schemes> | T]> {
  renderer: Renderer<unknown>
  presets: RenderPreset<Schemes, T>[] = []
  owners = new WeakMap<HTMLElement, RenderPreset<Schemes, T>>()

  constructor() {
    super('vue-render')
    this.renderer = getRenderer()

    this.addPipe(context => {
      if (!context || typeof context !== 'object' || !('type' in context)) return context

      if (context.type === 'unmount') {
        this.unmount(context.data.element)
      } else if (context.type === 'render') {
        if ('filled' in context.data && context.data.filled) {
          return context
        }
        if (this.mount(context.data.element, context as T)) {
          return {
            ...context,
            data: {
              ...context.data,
              filled: true
            }
          } as typeof context
        }
      }

      return context
    })
  }

  setParent(scope: Scope<Requires<Schemes> | T>): void {
    super.setParent(scope)

    this.presets.forEach(preset => {
      if (preset.attach) preset.attach(this)
    })
  }

  private unmount(element: HTMLElement) {
    this.owners.delete(element)
    this.renderer.unmount(element)
  }

  private mount(element: HTMLElement, context: T) {
    const existing = this.renderer.get(element)
    const parent = this.parentScope()

    if (existing) {
      this.presets.forEach(preset => {
        if (this.owners.get(element) !== preset) return
        const result = preset.update(context as Extract<T, { type: 'render' }>, this)

        if (result) {
          this.renderer.update(existing, result)
        }
      })
      return true
    }

    for (const preset of this.presets) {
      const result = preset.render(context as Extract<T, { type: 'render' }>, this)

      if (!result) continue

      this.renderer.mount(
        element,
        result.component,
        result.props,
        () => parent?.emit({ type: 'rendered', data: (context as Requires<Schemes>).data } as T)
      )

      this.owners.set(element, preset)
      return true
    }
  }

  /**
   * Adds a preset to the plugin.
   * @param preset Preset that can render nodes, connections and other elements.
   */
  public addPreset<K>(preset: RenderPreset<Schemes, CanAssignSignal<T, K> extends true ? K : 'Cannot apply preset. Provided signals are not compatible'>) {
    const local = preset as RenderPreset<Schemes, T>

    if (local.attach) local.attach(this)
    this.presets.push(local)
  }
}
