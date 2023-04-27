<template lang="pug">
.minimap(
  ref="container"
  :style="{ width: px(size * ratio), height: px(size) }"
  @pointerdown.stop.prevent=""
  @dblclick.stop.prevent="dblclick($event)"
  data-testid="minimap"
)
  MiniNode(
    v-for="(node, index) of nodes"
    :key="[index, node.left].join('_')"
    :left="scale(node.left)"
    :top="scale(node.top)"
    :width="scale(node.width)"
    :height="scale(node.height)"
  )
  MiniViewport(
    :left="viewport.left"
    :top="viewport.top"
    :width="viewport.width"
    :height="viewport.height"
    :containerWidth="$refs.container?.clientWidth"
    :translate="translate"
  )
</template>

<script>
import MiniNode from './MiniNode.vue'
import MiniViewport from './MiniViewport.vue'
import { px } from './utils'

export default {
  props: {
    size: Number,
    ratio: Number,
    nodes: Array,
    viewport: Object,
    translate: Function,
    point: Function,
    seed: Number
  },
  methods: {
    dblclick(e) {
      if (!this.$refs.container) return
      const box = this.$refs.container.getBoundingClientRect()
      const x = (e.clientX - box.left) / (this.size * this.ratio)
      const y = (e.clientY - box.top) / (this.size * this.ratio)

      this.point(x, y)
    },
    px,
    scale(value) {
      if (!this.$refs.container) return 0

      return value * this.$refs.container.clientWidth
    }
  },
  components: {
    MiniNode,
    MiniViewport
  }
}
</script>

<style lang="scss" scoped>
.minimap {
  position: absolute;
  right: 24px;
  bottom: 24px;
  background: rgba(229, 234, 239, 0.65);
  padding: 20px;
  overflow: hidden;
  border: 1px solid #b1b7ff;
  border-radius: 8px;
  box-sizing: border-box;
}
</style>
