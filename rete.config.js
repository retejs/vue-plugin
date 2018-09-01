import pug from 'rollup-plugin-pug';
import sass from 'rollup-plugin-sass';

export default {
    input: 'src/index.js',
    name: 'VueRenderPlugin',
    globals: {
        'vue': 'Vue'
    },
    plugins: [
        pug({
            pugRuntime: false
        }),
        sass({
            insert: true
        })
    ]
}