<template>
  <div>
    <headerC />
    <sidebar />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Sidebar from '@components/event-bus-example/sidebar.vue'
import HeaderC from '@components/event-bus-example/header.vue'

export default defineComponent({
  name: 'Main',
  components: {
    'sidebar': Sidebar,
    'headerC': HeaderC,
  }
})
</script>

<style lang="scss" module>
</style>
