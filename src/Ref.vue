<template lang="pug">
div(v-bind="$props" ref="element")
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['data', 'emit'],
  mounted() {
    this.emit({ type: 'render', data: { ...this.data, element: this.$refs.element } })
  },
  beforeUnmount() {
    this.emit({ type: 'unmount', data: { element: this.$refs.element } })
  }
})
</script>
