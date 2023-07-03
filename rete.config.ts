/* eslint-disable @typescript-eslint/naming-convention */
import replace from '@rollup/plugin-replace'
import vue3 from '@vitejs/plugin-vue'
import vue2 from '@vitejs/plugin-vue2'
import { ReteOptions } from 'rete-cli'
import pug from 'rollup-plugin-pug'
import scss from 'rollup-plugin-scss'

function getPlugins(vueVersion: 2 | 3): NonNullable<ReteOptions['plugins']> {
  return [
    replace({
      values: {
        'process.env.VUECOMPAT': `./vuecompat/${vueVersion === 2 ? 'vue2' : 'vue3'}`
      },
      preventAssignment: true
    }),
    pug({
      pugRuntime: false
    }),
    // eslint-disable-next-line no-undef
    vueVersion === 2 ? vue2() : vue3({ compiler: require('@vue/compiler-sfc') }),
    scss({
      insert: true
    })
  ]
}

const vue3Config = {
  output: '.',
  plugins: getPlugins(3)
}
const vue2Config = {
  output: 'vue2',
  plugins: getPlugins(2)
}

export default <ReteOptions[]>[vue3Config, vue2Config].map(({ output, plugins }) => ({
  input: 'src/index.ts',
  output,
  name: 'ReteVuePlugin',
  globals: {
    'rete': 'Rete',
    'rete-area-plugin': 'ReteAreaPlugin',
    'rete-render-utils': 'ReteRenderUtils',
    'vue': 'Vue'
  },
  plugins
}))
