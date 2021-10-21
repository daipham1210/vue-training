<template>
  <el-dialog
    :visible="show"
  >
    <div class="body">
      <form class="formBook" @submit.prevent="onSubmit">
        <div class="formItem">
          <label>Name: </label>
          <input v-model="bookData.title" type="text" />
        </div>
        <div class="formItem">
          <label>Book Name: </label>
          <input v-model="bookData.author" type="text" />
        </div>
        <div class="formItem">
          <label>Description: </label>
          <input v-model="bookData.decription" type="textarea" />
        </div>
      </form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('closed')">Cancel</el-button>
        <el-button type="primary" @click="onSubmit">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { 
  defineComponent, 
  reactive, 
  toRefs, 
  getCurrentInstance,
  watch,
} from "vue";

export default defineComponent({
  name: 'BookFormModal',
  props: {
    value: Boolean,
    formType: String,
    bookProp: {
      type: Object,
      default: () => {}, 
      // type: Array,
      // default: () => [],
    },
  },
  setup(props, { emit }) {
    const vm = getCurrentInstance().proxy
    
    const data = reactive({
      show: false,
      bookData: {},
    })

    const onSubmit = () => {
      if (props.formType === 'create') {
        emit('submit-create-book', data.bookData)
        data.bookData = {}
      } else {
        /* eslint-disable no-debugger */
        debugger
        emit('submit-update-book', data.bookData)
      }
    }

    watch(
      () => props.value,
      (val) => vm.$nextTick(() => (data.show = val)),
      { immediate: true }
    )

    watch(
      () => props.bookProp,
      (newVal) => {
        data.bookData = Object.assign({}, newVal)
      },
      { deep: true }
    )

    return {
      ...toRefs(data),
      onSubmit,
    }
  }
})
</script>

<style scoped lang="scss">
.formBook {
  box-shadow: none;
  .formItem {
    margin: 10px;
    input {
      width: 100%;
    }
  .formButton {
    right: 0;
  }
  }
}
</style>
