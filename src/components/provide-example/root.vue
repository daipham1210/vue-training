<template>
  <div>
    <h1>Time in UTC</h1>
    <p>greeting: {{ greeting }}</p>
    <p>data: {{ timeFormat }}</p>
    <parent />
  </div>
</template>

<script>
import { defineComponent, provide, computed } from 'vue'
import parent from '@components/provide-example/parent.vue'

export default defineComponent({
  name: '',
  components: {
    'parent': parent,
  },
  setup() {
    const data = {
      greeting: 'Hello World',
      time: new Date(), 
      // timeZone: "Asia/Ho_Chi_Minh",
      // timeZone: "Asia/Tokyo",
      timeFormat: computed(() => data.time.toLocaleString('en-US', { timeZone: "UTC" })),
    }
    provide('greeting', data.greeting) 
    provide('time', data.time) 

    return {
      ...data,
    }
  }
})
</script>

<style lang="scss" module>
</style>
