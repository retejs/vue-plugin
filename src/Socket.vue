<template>
  <div class="socket" :class="className" :title="socket.name"></div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { kebab } from "./utils";
export default defineComponent({
  props: ["type", "socket"],
  setup(props) {
    const className = computed(() => {
      return kebab([props.type, props.socket.name]);
    });
    return {
      className
    };
  }
});
</script>

<style lang="scss" scoped>
@import "./vars";

.socket {
  display: inline-block;
  cursor: pointer;
  border: 1px solid white;
  border-radius: $socket-size/2.0;
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
    margin-right: - $socket-size / 2;
  }
  &.input {
    margin-left: - $socket-size / 2;
  }
}
</style>
