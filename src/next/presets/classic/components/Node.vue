<template lang="pug">
.node(:class="{ selected: data.selected }")
  .title {{data.label}}

  // Outputs
  .output(v-for='[key, output] in outputs' :key="key")
    .output-title {{output.label}}
    .output-socket(:ref="el => onRef(el, key, output, 'output')")

  // Controls
  .control(
    v-for='[key, control] in controls',
    :key="key",
    :ref="el => onRef(el, key, control, 'control')"
  )

  // Inputs
  .input(v-for='[key, input] in inputs' :key="key")
    .input-socket(:ref="el => onRef(el, key, input, 'input')")
    .input-title(v-show='!input.showControl') {{input.label}}
    .input-control(
      v-show='input.showControl'
      :ref="el => onRef(el, key, input.control, 'control')"
    )
</template>


<script lang="js">
import { defineComponent } from 'vue-demi'

function sortByIndex(entries) {
  entries.sort((a, b) => {
    const ai = a[1] && a[1].index || 0
    const bi = b[1] && b[1].index || 0

    return ai - bi
  })
  return entries
}

export default defineComponent({
  props: ['data', 'emit'],
  methods: {
    onRef(element, key, entity, type) {
      if (!element) return

      if (['output', 'input'].includes(type)) {
        this.emit({
          type: 'render', data: {
            type: 'socket',
            side: type,
            key,
            nodeId: this.data.id,
            element,
            payload: entity.socket
          }
        })
      } else if (type === 'control') {
        this.emit({
          type: 'render', data: {
            type: 'control',
            element,
            payload: entity
          }
        })
      }
    }
  },
  computed: {
    inputs() {
      return sortByIndex(Object.entries(this.data.inputs))
    },
    controls() {
      return sortByIndex(Object.entries(this.data.controls))
    },
    outputs() {
      return sortByIndex(Object.entries(this.data.outputs))
    }
  }
})
</script>

<style lang="scss" scoped>
@use "sass:math";
@import "../vars";

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
    padding: $socket-margin math.div($socket-size, 2) + $socket-margin;
  }
}
</style>
