export default {
    props: ['node', 'editor', 'bindSocket', 'bindControl'],
    methods: {
        inputs() {
            return Array.from(this.node.inputs.values())
        },
        outputs() {
            return Array.from(this.node.outputs.values())
        },
        controls() {
            return Array.from(this.node.controls.values())
        },
        selected() {
            return this.editor.selected.contains(this.node) ? 'selected' : '';
        }
    },
    directives: {
        socket: {
            bind(el, binding, vnode) {
                vnode.context.bindSocket(el, binding.arg, binding.value);
            },
            update(el, binding, vnode) {
                vnode.context.bindSocket(el, binding.arg, binding.value);
            }
        },
        control: {
            bind(el, binding, vnode) {
                if (!binding.value) return;

                vnode.context.bindControl(el, binding.value);
            }
        }
    }
}