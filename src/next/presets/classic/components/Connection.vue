<template lang="pug">
svg
  path(:d="path")
</template>

<script>
import { defineComponent } from 'vue'
import { classicConnectionPath } from 'rete-render-utils'

export default defineComponent({
  props: ['data', 'start', 'end'],
  computed: {
    path() {
      const { start, end } = this

      return start && end && classicConnectionPath([start.x, start.y, end.x, end.y], 0.3)
    }
  }
})
</script>

<style lang="scss">
svg {
  overflow: visible !important;
  position: absolute;
  z-index: -1;
  pointer-events: none;
  width: 9999px;
  height: 9999px;
  > * {
      pointer-events: all;
  }
  path {
    fill: none;
    stroke-width: 5px;
    stroke: steelblue;
  }
}
</style>
