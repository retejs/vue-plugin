<template lang="pug">
.block
  slot
</template>

<style lang="scss" scoped>
@import "../context-vars";

.block {
  color: #fff;
  padding: 4px;
  border-bottom: 1px solid $context-color-dark;
  background-color: $context-color;
  cursor: pointer;
  box-sizing: border-box;
  width: 100%;
  position: relative;

  &:first-child {
    border-top-left-radius: $context-menu-round;
    border-top-right-radius: $context-menu-round;
  }

  &:last-child {
    border-bottom-left-radius: $context-menu-round;
    border-bottom-right-radius: $context-menu-round;
  }

  &:hover {
    background-color: $context-color-light;
  }
}
</style>
