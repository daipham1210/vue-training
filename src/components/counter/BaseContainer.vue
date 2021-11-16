<template>
  <section>
    <h2>VueX </h2>
    <p>Counter: {{ $store.state.counter }}</p>
    <p>Final Counter: {{ finalCounter }}</p>
    <change-counter></change-counter>
  </section>
</template>

<script>
import { defineComponent, computed, getCurrentInstance } from "vue";
import ChangeCounter from "@components/counter/ChangeCounter.vue"

export default defineComponent({
  name: 'BaseContainer',
  components: {
    ChangeCounter,
  },
  setup() {
    const vm = getCurrentInstance().proxy
    const finalCounter = computed(() => vm.$store.getters.finalCounter)

    return {
      finalCounter,
    }
  }
})
</script>

<style scoped>
section {
  max-width: 30rem;
  margin: 2rem auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
}

h2 {
  text-align: center;
}
</style>