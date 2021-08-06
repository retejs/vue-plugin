<template>
  <div class="node" :class="className">
    <div class="title">{{ node.name }}</div>
    <!-- Outputs-->
    <div class="output" v-for="output in outputs()" :key="output.key">
      <div class="output-title">{{ output.name }}</div>
      <Socket
        v-socket:output="output"
        type="output"
        :socket="output.socket"
      ></Socket>
    </div>
    <!-- Controls-->
    <div
      class="control"
      v-for="control in controls()"
      :key="control.key"
      v-control="control"
    >
    </div>
    <!-- Inputs-->
    <div class="input" v-for="input in inputs()" :key="input.key">
      <Socket
        v-socket:input="input"
        type="input"
        :socket="input.socket"
      ></Socket>
      <div class="input-title" v-show="!input.showControl()">
        {{ input.name }}
      </div>
      <div
        class="input-control"
        v-show="input.showControl()"
        v-control="input.control"
      ></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import Mixin from './mixin';
import Socket from "./Socket.vue";
import { kebab } from "./utils";
export default defineComponent({
  name: "node",
  components: {
    Socket
  },
  mixins: [Mixin],
  setup(props) {
    const selected = () => {
      return props.editor.selected.contains(props.node) ? "selected" : "";
    };
    const className = computed(() => {
      return kebab([selected(), props.node.name]);
    });

    return { className };
  }
});
</script>

<style scoped lang="scss">
@import "./vars";

.node {
  background: $node-color;
  border: 2px solid #4e58bf;
  border-radius: 10px;
  cursor: pointer;
  min-width: $node-width;
  height: auto;
  padding-bottom: 6px;
  box-sizing: content-box;
  position: relative;
  user-select: none;
  &:hover {
    background: lighten($node-color,4%);
  }
  &.selected {
    background: $node-color-selected;
    border-color: #e3c000;
  }
  .title {
    color: white;
    font-family: sans-serif;
    font-size: 18px;
    padding: 8px;
  }
  .output {
    text-align: right;
  }
  .input {
    text-align: left;
  }
  .input-title,.output-title {
    vertical-align: middle;
    color: white;
    display: inline-block;
    font-family: sans-serif;
    font-size: 14px;
    margin: $socket-margin;
    line-height: $socket-size;
  }
  .input-control {
    z-index: 1;
    width: calc(100% - #{$socket-size + 2*$socket-margin});
    vertical-align: middle;
    display: inline-block;
  }
  .control {
    padding: $socket-margin $socket-size/2 + $socket-margin;
  }
}
</style>
