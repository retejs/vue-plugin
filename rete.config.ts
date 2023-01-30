import { ReteOptions } from 'rete-cli'
import pug from 'rollup-plugin-pug'
import scss from 'rollup-plugin-scss'
import vue from 'rollup-plugin-vue'

export default <ReteOptions>{
    input: 'src/index.ts',
    name: 'VueRenderPlugin',
    globals: {
        'rete': 'Rete',
        'rete-area-plugin': 'ReteAreaPlugin',
        'rete-render-utils': 'RenderUtils',
        'vue': 'Vue'
    },
    plugins: [
        pug({
            pugRuntime: false
        }),
        vue(),
        scss({
            insert: true
        })
    ]
}
