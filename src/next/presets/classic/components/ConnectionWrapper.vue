<template lang="pug">
component(:is="component" v-bind="data" :start="startPosition" :end="endPosition")
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['component', 'data', 'start', 'end'],
  data() {
    return {
      _start: { x: 0, y: 0 },
      _end: { x: 0, y: 0 },
      onDestroy: null
    }
  },
  computed: {
    startPosition() {
      if (this.start && 'x' in this.start) return this.start
      return this._start
    },
    endPosition() {
      if (this.end && 'x' in this.end) return this.end
      return this._end
    }
  },
  created() {
    const unwatch1 = typeof this.start === 'function' && this.start(pos => {
      this._start = pos
    })
    const unwatch2 = typeof this.end === 'function' && this.end(pos => {
      this._end = pos
    })

    this.onDestroy = () => {
        unwatch1 && unwatch1()
        unwatch2 && unwatch2()
    }
  },
  destroyed() {
    if (this.onDestroy) this.onDestroy()
  }
})
</script>
