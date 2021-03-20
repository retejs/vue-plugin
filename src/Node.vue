<template lang="pug">
.node(:class="[selected(), node.name] | kebab")
  .title {{node.name}}

  // Outputs
  .output(v-for='output in outputs()' :key="output.key")
    .output-title {{output.name}}
    Socket(v-socket:output="output", type="output", :socket="output.socket")

  // Controls
  .control(
    v-for='control in controls()',
    :key="control.key",
    v-control="control"
  )

  // Inputs
  .input(v-for='input in inputs()' :key="input.key")
    Socket(v-socket:input="input", type="input", :socket="input.socket")
    .input-title(v-show='!input.showControl()') {{input.name}}
    .input-control(
      v-show='input.showControl()'
      v-control="input.control"
    )
</template>

<script>
import mixin from './mixin';
import Socket from './Socket.vue';

export default {
  mixins: [mixin],
  components: {
    Socket
  }
}
</script>

<style lang="sass" scoped>
@import "./vars"

.node
  background: $node-color
  border: 2px solid #4e58bf
  border-radius: 10px
  cursor: pointer
  min-width: $node-width
  height: auto
  padding-bottom: 6px
  box-sizing: content-box
  position: relative
  user-select: none
  &:hover
    background: lighten($node-color,4%)
  &.selected
    background: $node-color-selected
    border-color: #e3c000
  .title
    color: white
    font-family: sans-serif
    font-size: 18px
    padding: 8px
  .output
    text-align: right
  .input
    text-align: left
  .input-title,.output-title
    vertical-align: middle
    color: white
    display: inline-block
    font-family: sans-serif
    font-size: 14px
    margin: $socket-margin
    line-height: $socket-size
  .input-control
    z-index: 1
    width: calc(100% - #{$socket-size + 2*$socket-margin})
    vertical-align: middle
    display: inline-block
  .control
    padding: $socket-margin $socket-size/2 + $socket-margin
</style>