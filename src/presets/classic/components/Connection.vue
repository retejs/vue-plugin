<template lang="pug">
svg(data-testid="connection")
  path(:d="path")
</template>

<script>
export default {
  props: ['data', 'start', 'end', 'path']
}
</script>

<style lang="scss" scoped>
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
