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

      return start && end && classicConnectionPath([start, end], 0.3)
    }
  }
})
</script>

<style lang="scss">
/*! https://github.com/retejs/connection-plugin/commit/206ca0fd7fb82801ac45a0f7180ae05dff9ed901 */
svg {
  overflow: visible !important;
  position: absolute;
  pointer-events: none;
  width: 9999px;
  height: 9999px;
  path {
    fill: none;
    stroke-width: 5px;
    stroke: steelblue;
    pointer-events: auto;
  }
}
</style>
