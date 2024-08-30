import { BaseSchemes } from 'rete'
import { BaseAreaPlugin } from 'rete-area-plugin'

import { RenderPreset } from '../types'
import Pins from './Pins.vue'
import { PinsRender } from './types'

type Props = {
  translate?: (id: string, dx: number, dy: number) => void
  contextMenu?: (id: string) => void
  pointerdown?: (id: string) => void
}

/**
 * Preset for rendering pins.
 */
export function setup<Schemes extends BaseSchemes, K extends PinsRender>(props?: Props): RenderPreset<Schemes, K> {
  const getProps = () => ({
    menu: props?.contextMenu ?? (() => null),
    translate: props?.translate ?? (() => null),
    down: props?.pointerdown ?? (() => null)
  })

  return {
    update(context) {
      if (context.data.type === 'reroute-pins') {
        return {
          ...getProps(),
          pins: context.data.data.pins
        }
      }
    },
    render(context, plugin) {
      if (context.data.type === 'reroute-pins') {
        const area = plugin.parentScope<BaseAreaPlugin<Schemes, PinsRender>>(BaseAreaPlugin)

        return {
          component: Pins,
          props: {
            ...getProps(),
            getPointer: () => area.area.pointer,
            pins: context.data.data.pins
          }
        }
      }
    }
  }
}
