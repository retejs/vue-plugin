import { BaseSchemes } from 'rete'

import { RenderPreset } from '../types'
import Menu from './components/Menu.vue'
import { ContextMenuRender } from './types'

export function setup<Schemes extends BaseSchemes, K extends ContextMenuRender>(props?: { delay?: number }): RenderPreset<Schemes, K> {
  const delay = typeof props?.delay === 'undefined' ? 1000 : props.delay

  return {
    update(context) {
      if (context.data.type === 'contextmenu') {
        return {
          items: context.data.items,
          delay,
          searchBar: context.data.searchBar,
          onHide: context.data.onHide
        }
      }
    },
    render(context) {
      if (context.data.type === 'contextmenu') {
        return {
          component: Menu,
          props: {
            items: context.data.items,
            delay,
            searchBar: context.data.searchBar,
            onHide: context.data.onHide
          }
        }
      }
    }
  }
}
