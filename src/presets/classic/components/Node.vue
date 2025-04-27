<template lang="pug">
.node(:class="{ selected: data.selected }" :style="nodeStyles()" data-testid="node")
  .title(data-testid="title") {{data.label}}

  // Outputs
  .output(v-for='[key, output] in outputs()' :key="'output' + key + seed" :data-testid="'output-'+key")
    .output-title(data-testid="output-title") {{output.label}}
    Ref.output-socket(
      :data="{ type: 'socket', side: 'output', key: key, nodeId: data.id, payload: output.socket }"
      :emit="emit"
      data-testid="output-socket")

  // Controls
  Ref.control(
    v-for='[key, control] in controls()',
    :key="'control' + key + seed",
    :data-testid="'control-'+key"
    :emit="emit"
    :data="{ type: 'control', payload: control }"
  )

  // Inputs
  .input(v-for='[key, input] in inputs()' :key="'input' + key + seed" :data-testid="'input-'+key")
    Ref.input-socket(
      :data="{ type: 'socket', side: 'input', key: key, nodeId: data.id, payload: input.socket }"
      :emit="emit"
      data-testid="input-socket"
    )
    .input-title(v-show='!input.control || !input.showControl' data-testid="input-title") {{input.label}}
    Ref.input-control(
      v-show='input.control && input.showControl'
      :emit="emit"
      :data="{ type: 'control', payload: input.control }"
      data-testid="input-control"
    )
</template>


<script lang="js">
import Ref from '../../../Ref.vue'

function sortByIndex(entries) {
  entries.sort((a, b) => {
    const ai = a[1] && a[1].index || 0
    const bi = b[1] && b[1].index || 0

    return ai - bi
  })
  return entries
}

export default {
  props: ['data', 'emit', 'seed'],
  methods: {
    nodeStyles() {
      return {
        width: Number.isFinite(this.data.width) ? `${this.data.width}px` : '',
        height: Number.isFinite(this.data.height) ? `${this.data.height}px` : ''
      }
    },
    inputs() {
      return sortByIndex(Object.entries(this.data.inputs))
    },
    controls() {
      return sortByIndex(Object.entries(this.data.controls))
    },
    outputs() {
      return sortByIndex(Object.entries(this.data.outputs))
    }
  },
  components: {
    Ref
  }
}
</script>

<style lang="scss" scoped>
@use "sass:math";
@import "../vars";

.node {
  background: $node-color;
  border: 2px solid #4e58bf;
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  width: $node-width;
  height: auto;
  padding-bottom: 6px;
  position: relative;
  user-select: none;
  line-height: initial;
  font-family: Arial;

  &:hover {
    background: lighten($node-color, 4%);
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

  .output-socket {
    text-align: right;
    margin-right: -(math.div($socket-size, 2) + $socket-margin);
    display: inline-block;
  }

  .input-socket {
    text-align: left;
    margin-left: -(math.div($socket-size, 2) + $socket-margin);
    display: inline-block;
  }

  .input-title,
  .output-title {
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
    padding: $socket-margin math.div($socket-size, 2) + $socket-margin;
  }
}
</style>
