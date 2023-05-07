import { BaseSchemes } from 'rete'

import { VueRenderPlugin } from '..'

type ComponentProps = Record<string, any> | undefined | void | null
type RenderResult = { component: any, props: ComponentProps } | undefined | void | null

export type RenderPreset<Schemes extends BaseSchemes, T> = {
  attach?: (plugin: VueRenderPlugin<Schemes, T>) => void
  update: (context: Extract<T, { type: 'render' }>, plugin: VueRenderPlugin<Schemes, T>) => ComponentProps
  render: (context: Extract<T, { type: 'render' }>, plugin: VueRenderPlugin<Schemes, T>) => RenderResult
}
