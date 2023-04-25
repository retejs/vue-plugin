<template lang="pug">
Block.item(
  :class="{ hasSubitems: subitems }"
  @click.stop="$emit('select', $event); $emit('hide')"
  @wheel.stop=""
  @pointerover="hide.cancel(); visibleSubitems = true"
  @pointerleave="hide.call()"
)
  slot
  .subitems(v-if="subitems && visibleSubitems")
    Item(
      v-for="item of subitems"
      :key="item.key"
      @select="item.handler($event)"
      :delay="delay"
      @hide="$emit('hide')"
      :subitems="item.subitems"
    ) {{ item.label }}
</template>

<script>
import Block from './Block.vue'
import { debounce } from '../utils/debounce'

export default {
  name: 'Item',
  props: ['subitems', 'delay'],
  data() {
    return {
      visibleSubitems: false,
      hide: debounce(this.delay, this.hideSubitems)
    }
  },
  methods: {
    hideSubitems() {
      this.visibleSubitems = false
    }
  },
  components: {
    Block
  }
}
</script>

<style lang="scss" scoped>
@import "../context-vars";

.hasSubitems {
  &:after {
    content: '►';
    position: absolute;
    opacity: 0.6;
    right: 5px;
    top: 5px;
  }
}

.subitems {
  position: absolute;
  top: 0;
  left: 100%;
  width: $width;
}
</style>
