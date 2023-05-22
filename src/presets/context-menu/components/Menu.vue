<template lang="pug">
.menu(
  @mouseover="hide.cancel()"
  @mouseleave="hide.call()"
  data-testid="context-menu"
  rete-context-menu
)
  Block(v-if="searchBar")
    Search(:text="filter" @change="filter = $event")
  Item.item(
    v-for="item of getItems()"
    :key="item.key"
    @select="item.handler($event)"
    :delay="delay"
    @hide="$emit('hide')"
    :subitems="item.subitems"
  )
    | {{ item.label }}
</template>

<script>
import { defineComponent } from 'vue'
import Block from './Block.vue'
import Search from './Search.vue'
import Item from './Item.vue'
import { debounce } from '../utils/debounce'

export default defineComponent({
  props: ['items', 'delay', 'searchBar', 'onHide', 'seed'],
  data() {
    return {
      filter: '',
      hide: debounce(this.delay, this.onHide)
    }
  },
  methods: {
    getItems() {
      const filterRegexp = new RegExp(this.filter, 'i')
      const filteredList = this.items.filter(item => (
        item.label.match(filterRegexp)
      ))

      return filteredList
    }
  },
  unmounted() {
    if (this.hide) this.hide.cancel()
  },
  components: {
    Block,
    Search,
    Item
  }
})
</script>

<style lang="scss" scoped>
@use "sass:math";
@import "../context-vars";

.menu {
  padding: 10px;
  width: $width;
  margin-top: -20px;
  margin-left: - math.div($width, 2);
}
</style>
