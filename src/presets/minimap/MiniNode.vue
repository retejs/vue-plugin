<template lang="pug">
.mini-node(:style="styles")
</template>

<script>
import { px } from './utils'

export default {
  props: ['left', 'top', 'width', 'height'],
  computed: {
    styles() {
      return {
        left: px(this.left),
        top: px(this.top),
        width: px(this.width),
        height: px(this.height)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mini-node {
  position: absolute;
  background: rgba(110, 136, 255, 0.8);
  border: 1px solid rgb(192 206 212 / 60%);
}
</style>
