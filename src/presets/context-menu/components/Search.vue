<template lang="pug">
//- v-model cannot be used here due to compatibility with Vue 2 and 3
input.search(
  :value="text"
  @input="$emit('change', $event.target.value)"
  data-testid="context-menu-search-input"
)
</template>

<script>
export default {
  props: ['text']
}

</script>

<style lang="scss" scoped>
.search {
  color: white;
  padding: 1px 8px;
  border: 1px solid white;
  border-radius: 10px;
  font-size: 16px;
  font-family: serif;
  width: 100%;
  box-sizing: border-box;
  background: transparent;
}
</style>
