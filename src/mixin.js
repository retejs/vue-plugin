export default {
  props: ["node", "editor", "bindSocket", "bindControl"],
  methods: {
    inputs() {
      return Array.from(this.node.inputs.values());
    },
    outputs() {
      return Array.from(this.node.outputs.values());
    },
    controls() {
      return Array.from(this.node.controls.values());
    },
    selected() {
      return this.editor.selected.contains(this.node) ? "selected" : "";
    }
  },
  directives: {
    socket: {
      mounted(el, binding, vnode) {
        binding.instance.bindSocket(el, binding.arg, binding.value);
      },
      update(el, binding, vnode) {
        binding.instance.bindSocket(el, binding.arg, binding.value);
      }
    },
    control: {
      mounted(el, binding, vnode) {
        if (!binding.value) return;
        binding.instance.bindControl(el, binding.value);
      }
    }
  }
};
