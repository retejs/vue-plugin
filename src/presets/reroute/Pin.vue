<template lang="pug">
.pin(
  @pointerdown.stop.prevent="drag.start($event); $emit('down')"
  @contextmenu.stop.prevent="$emit('menu')"
  :class="{ selected }"
  :style="style"
  data-testid="pin"
)
</template>

<script>
import { useDrag } from '../../shared/drag'
const pinSize = 20

export default {
  props: ['position', 'selected', 'getPointer'],
  data() {
    return {
      drag: useDrag(this.onDrag, this.getPointer)
    }
  },
  computed: {
    style() {
      const { x, y } = this.position

      return {
        position: 'absolute',
        top: `${y - pinSize / 2}px`,
        left: `${x - pinSize / 2}px`
      }
    }
  },
  methods: {
    onDrag(dx, dy) {
      this.$emit('translate', { dx, dy })
    }
  }
}
</script>

<style lang="scss" scoped>
$size: 20px;

.pin {
  width: $size;
  height: $size;
  box-sizing: border-box;
  background: steelblue;
  border: 2px solid white;
  border-radius: $size;

  &.selected {
    background: #ffd92c;
  }
}
</style>
