import replace from '@rollup/plugin-replace'
import vue3 from '@vitejs/plugin-vue'
import vue2 from '@vitejs/plugin-vue2'
import { ReteOptions } from 'rete-cli'
import pug from 'rollup-plugin-pug'
import scss from 'rollup-plugin-scss'
import execute from 'rollup-plugin-shell'

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
        vueVersion === 2 ? vue2() : vue3({ compiler: require('@vue/compiler-sfc') }),
        scss({
            insert: true
        })
    ]
}

function getVue2Package() {
    return {
        main: '../build/vue2/vue-render-plugin.common.js',
        module: '../build/vue2/vue-render-plugin.esm.js',
        types: '../types'
    }
}

const vue3Config = {
    output: 'build',
    plugins: getPlugins(3)
}
const vue2Config = {
    output: 'build/vue2',
    plugins: [
        ...getPlugins(2),
        execute({ commands: [
            'mkdir -p vue2',
            `echo '${JSON.stringify(getVue2Package(), null, 2)}' > vue2/package.json`
        ], hook: 'buildStart' })
    ]
}

export default <ReteOptions[]>[vue3Config, vue2Config].map(({ output, plugins }) => ({
    input: 'src/index.ts',
    output,
    name: 'VueRenderPlugin',
    globals: {
        'rete': 'Rete',
        'rete-area-plugin': 'ReteAreaPlugin',
        'rete-render-utils': 'RenderUtils',
        'vue': 'Vue'
    },
    plugins
}))
