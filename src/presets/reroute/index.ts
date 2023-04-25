import { BaseSchemes } from 'rete'

import { RenderPreset } from '../types'
import Pins from './Pins.vue'
import { PinsRender } from './types'

type Props = {
  translate?: (id: string, dx: number, dy: number) => void
  contextMenu?: (id: string) => void
  pointerdown?: (id: string) => void
}

export function setup<Schemes extends BaseSchemes, K extends PinsRender<Schemes>>(props?: Props): RenderPreset<Schemes, K> {
  const getProps = () => ({
    menu: props?.contextMenu || (() => null),
    translate: props?.translate || (() => null),
    down: props?.pointerdown || (() => null)
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
    render(context) {
      if (context.data.type === 'reroute-pins') {
        return {
          component: Pins,
          props: {
            ...getProps(),
            pins: context.data.data.pins
          }
        }
      }
    }
  }
}
