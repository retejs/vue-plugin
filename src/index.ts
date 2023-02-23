import { BaseSchemes, Scope } from 'rete'
import { Area2DInherited, RenderData } from 'rete-area-plugin'

import { RenderPreset } from './presets/types'
import { getRenderer, Renderer } from './renderer'
import { ExtraRender, Position } from './types'

export * as Presets from './presets'
export type { VueArea2D } from './types'

export type Produces<Schemes extends BaseSchemes> =
    | { type: 'connectionpath', data: { payload: Schemes['Connection'], path?: string, points: Position[] } }

export class VueRenderPlugin<Schemes extends BaseSchemes, T extends ExtraRender = never> extends Scope<Produces<Schemes>, Area2DInherited<Schemes, T>> {
  renderer: Renderer<unknown>
  presets: RenderPreset<Schemes, T>[] = []
  owners = new WeakMap<HTMLElement, RenderPreset<Schemes, T>>()

  constructor() {
    super('vue-render')
    this.renderer = getRenderer()

    this.addPipe(context => {
      if (!('type' in context)) return context

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
          }
        }
      }

      return context
    })
  }

  private unmount(element: HTMLElement) {
    this.owners.delete(element)
    this.renderer.unmount(element)
  }

  // eslint-disable-next-line max-statements
  private mount(element: HTMLElement, context: T) {
    const existing = this.renderer.get(element)
    const parent = this.parentScope()

    if (existing) {
      this.presets.forEach(preset => {
        if (this.owners.get(element) !== preset) return
        const result = preset.update(context as T, this)

        if (result) {
          this.renderer.update(existing, result)
        }
      })
      return true // TODO
    }

    for (const preset of this.presets) {
      const result = preset.render(context as T, this)

      if (!result) continue

      this.renderer.mount(
        element,
        result.component,
        result.props,
        () => parent?.emit({ type: 'rendered', data: context.data })
      )

      this.owners.set(element, preset)
      return true
    }
  }

  public addPreset(preset: RenderPreset<Schemes, T | { type: 'render', data: RenderData<Schemes> }>) {
    this.presets.push(preset)
  }
}
