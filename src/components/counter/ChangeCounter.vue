<template>
  <el-button @click="addOne">Add 1</el-button>
  <el-button @click="addValue">Add value</el-button>
  <el-input v-model="value" class="input" placeholder="Please input" />
  <el-button @click="resetValue">Reset value</el-button>
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

    const addOne = () => vm.$store.dispatch('numbers/increment') // goi den ham mutation
    const addValue = () => {
      vm.$store.dispatch('numbers/increase', {
        value: +data.value,
      })
    }

    const resetValue = () => {
      vm.$store.dispatch('numbers/resetCounter')
    }

    return {
      ...toRefs(data),
      addOne,
      addValue,
      resetValue,
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