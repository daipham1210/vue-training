<template>
  <div>
    <h1>Time in ICT</h1>
    <p>greeting from root: {{ greeting }}</p>
    <p>data: </p>
    <child />
  </div>
</template>

<script>
import { defineComponent, inject, reactive, toRefs } from 'vue'
import child from '@components/provide-example/child.vue'

export default defineComponent({
  name: '',
  components: {
    'child': child,
  },
  setup() {
    const data = reactive({
      greeting: '',
    })
    data.greeting = inject('greeting', '')
    // get time tu provide dung inject

    // tao compute value tu time, format theo timezone ho chi minh
    return {
      ...toRefs(data),
    }

  }
})
</script>

<style lang="scss" module>
</style>
