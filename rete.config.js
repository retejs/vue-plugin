import commonjs from 'rollup-plugin-commonjs';
import scss from 'rollup-plugin-scss';
import vue from 'rollup-plugin-vue';

export default {
    input: 'src/index.js',
    name: 'VueRenderPlugin',
    globals: {
        'vue': 'Vue'
    },
    plugins: [
        vue(),
        scss({
            insert: true
        }),
        commonjs()
    ]
}
