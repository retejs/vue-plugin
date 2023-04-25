<template lang="pug">
.pins
  Pin(
    v-for="pin of pins"
    :key="pin.id"
    :id="pin.position"
    :position="pin.position"
    :selected="pin.selected"
    @menu="menu(pin.id)"
    @translate="translate(pin.id, $event.dx, $event.dy)"
    @down="down(pin.id)"
  )
</template>

<script>
import Pin from './Pin.vue'

export default {
  props: ['pins', 'menu', 'translate', 'down', 'seed'],
  components: {
    Pin
  }
}
</script>
