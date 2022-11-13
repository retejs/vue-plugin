import vue from 'rollup-plugin-vue'
import { ReteOptions } from 'rete-cli'
import pug from 'rollup-plugin-pug'
import scss from 'rollup-plugin-scss'

export default <ReteOptions>{
    input: 'src/index.ts',
    name: 'VueRenderPlugin',
    globals: {
        'rete': 'Rete',
        'rete-area-plugin': 'ReteAreaPlugin',
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
