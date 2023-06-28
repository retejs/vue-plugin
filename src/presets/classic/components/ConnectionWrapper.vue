<template lang="pug">
component(:is="component" :data="data" :start="startPosition" :end="endPosition", :path="observedPath")
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['component', 'data', 'start', 'end', 'path'],
  data() {
    return {
      observedStart: { x: 0, y: 0 },
      observedEnd: { x: 0, y: 0 },
      observedPath: '',
      onDestroy: null
    }
  },
  computed: {
    startPosition() {
      if (this.start && 'x' in this.start) return this.start
      return this.observedStart
    },
    endPosition() {
      if (this.end && 'x' in this.end) return this.end
      return this.observedEnd
    }
  },
  watch: {
    startPosition() { this.fetchPath() },
    endPosition() { this.fetchPath() }
  },
  methods: {
    async fetchPath() {
      if (this.startPosition && this.endPosition) {
        this.observedPath = await this.path(this.startPosition, this.endPosition)
      }
    }
  },
  created() {
    const unwatch1 = typeof this.start === 'function' && this.start(pos => {
      this.observedStart = pos
    })
    const unwatch2 = typeof this.end === 'function' && this.end(pos => {
      this.observedEnd = pos
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
