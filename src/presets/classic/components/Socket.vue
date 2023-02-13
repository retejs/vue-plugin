<template lang="pug">
.socket(
  :title="data.name"
)
</template>

<script>
export default {
  props: ['data']
}
</script>

<style lang="scss" scoped>
@use "sass:math";
@import "../vars";

.socket {
  display: inline-block;
  cursor: pointer;
  border: 1px solid white;
  border-radius: math.div($socket-size, 2);
  width: $socket-size;
  height: $socket-size;
  margin: $socket-margin;
  vertical-align: middle;
  background: $socket-color;
  z-index: 2;
  box-sizing: border-box;
  &:hover {
    border-width: 4px;
  }
  &.multiple {
    border-color: yellow;
  }
  &.output {
    margin-right: - math.div($socket-size, 2);
  }
  &.input {
    margin-left: - math.div($socket-size, 2);
  }
}
</style>
