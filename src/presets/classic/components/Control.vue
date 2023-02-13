<template lang="pug">
input(
  :type="data.type"
  :value="data.value"
  @change="change"
  @pointerdown.stop=""
)
</template>

<script>
export default {
  props: ['data'],
  methods: {
    change(e) {
      const val = this.data.type === 'number'
          ? +e.target.value
          : e.target.value

      this.data.value = val
    }
  }
}
</script>

<style lang="scss" scoped>
@use "sass:math";
@import "../vars";

input {
  width: $node-width - 50px;
  border-radius: 30px;
  background-color: white;
  padding: 2px 6px;
  border: 1px solid #999;
  font-size: 110%;
}
</style>
