<template lang="pug">
.mini-viewport(
  @pointerdown.stop="drag.start($event)"
  :style="styles"
)
</template>

<script>
import { px } from './utils'
import { useDrag } from './drag'

export default {
  props: ['left', 'top', 'width', 'height', 'containerWidth', 'translate'],
  data() {
    return {
      drag: useDrag(this.onDrag)
    }
  },
  methods: {
    scale(v) {
      return v * this.containerWidth
    },
    invert(v) {
      return v / this.containerWidth
    },
    onDrag(dx, dy) {
      this.translate(this.invert(-dx), this.invert(-dy))
    }
  },
  computed: {
    styles() {

      return {
        left: px(this.scale(this.left)),
        top: px(this.scale(this.top)),
        width: px(this.scale(this.width)),
        height: px(this.scale(this.height))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mini-viewport {
  position: absolute;
  background: rgba(255, 251, 128, 0.32);
  border: 1px solid #ffe52b;
}
</style>
