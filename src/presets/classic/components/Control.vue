<template lang="pug">
input(
  :type="data.type"
  :value="data.value"
  :readonly="data.readonly"
  @change="change"
  @pointerdown.stop=""
)
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['data'],
  methods: {
    change(e) {
      const val = this.data.type === 'number'
          ? +e.target.value
          : e.target.value

      this.data.setValue(val)
    }
  }
})
</script>

<style lang="scss" scoped>
@use "sass:math";
@import "../vars";

input {
  width: 100%;
  border-radius: 30px;
  background-color: white;
  padding: 2px 6px;
  border: 1px solid #999;
  font-size: 110%;
  box-sizing: border-box;
}
</style>
