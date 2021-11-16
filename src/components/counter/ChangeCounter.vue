<template>
  <button @click="addOne">Add 1</button>
  <button @click="addValue">Add value</button>
  <el-input v-model="value" class="input" placeholder="Please input" />
</template>

<script>
import { defineComponent, getCurrentInstance, reactive, toRefs } from "vue"

export default defineComponent({
  name: 'ChangeCounter',
  setup() {
    const vm = getCurrentInstance().proxy // lay ra instance cua chinh component trong file nay
    
    const data = reactive({
      value: 0,
    })

    const addOne = () => vm.$store.dispatch('increment') // goi den ham mutation

    const addValue = () => {
      vm.$store.commit('increase', {
        value: +data.value,
      })
    }

    return {
      ...toRefs(data),
      addOne,
      addValue,
    }
  }
})
</script>

<style scoped>
.input {
  margin-left: 20px;
  width: 150px;
}
</style>