/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseSchemes } from 'rete'

import { VuePlugin } from '..'

type ComponentProps = Record<string, any> | undefined | void | null
type RenderResult = { component: any, props: ComponentProps } | undefined | void | null

export type RenderPreset<Schemes extends BaseSchemes, T> = {
  attach?: (plugin: VuePlugin<Schemes, T>) => void
  update: (context: Extract<T, { type: 'render' }>, plugin: VuePlugin<Schemes, T>) => ComponentProps
  render: (context: Extract<T, { type: 'render' }>, plugin: VuePlugin<Schemes, T>) => RenderResult
}
