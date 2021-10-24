<template>
  <el-dialog
    :visible="show"
  >
    <div class="body">
      <form class="formBook" @submit.prevent="onSubmit">
        <div class="formItem">
          <label>Name: </label>
          <input v-model="v$.bookData.title.$model" type="text" />
          <div class="error" v-for="(error, index) in v$.bookData.title.$errors" :key="index">
            {{ error.$message }}
          </div>
        </div>
        <div class="formItem">
          <label>Book Name: </label>
          <input v-model="v$.bookData.author.$model" type="text" />
          <div class="error" v-for="(error, index) in v$.bookData.author.$errors" :key="index">
            {{ error.$message }}
          </div>
        </div>
        <div class="formItem">
          <label>Description: </label>
          <input v-model="v$.bookData.decription.$model" type="textarea" />
          <div class="error" v-for="(error, index) in v$.bookData.decription.$errors" :key="index">
            {{ error.$message }}
          </div>
        </div>
        <!-- <div class="formItem">
          <label>Price: </label>
          <input v-model="v$.bookData.price.$model" type="number" />
          <div class="error" v-for="(error, index) in v$.bookData.price.$errors" :key="index">
            {{ error.$message }}
          </div>
        </div> -->
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
} from "vue"
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

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
      bookData: {
        title: '',
        author: '',
        decription: '',
        price: 0,
      },
    })

    const rules = {
      bookData: { // truogn hop cac bien model nam trong object thi them key object o day
        title: {
          required: helpers.withMessage('Title cannot be empty', required),
        },
        author: {
          required: helpers.withMessage('Author cannot be empty', required),
        },
        decription: {
          required: helpers.withMessage('Decription cannot be empty', required),
        },
        // price: {
        //   required: helpers.withMessage('Price cannot be empty', required),
        //   greaterThanZero: helpers.withMessage(
        //     () => 'Price cannot be zero',
        //     (val) => (val && val > 0) // ham kiem tra gia tri thoa dieu kien
        //   ),
        // }
      }
    }

    const v$ = useVuelidate(rules, data)

    // v$ giong nhu instance vm, chua data

    const onSubmit = () => {
      v$.value.$touch() // touch all field of form
      if (v$.value.$invalid) return

      if (props.formType === 'create') {
        emit('submit-create-book', data.bookData)
        data.bookData = {}
      } else {
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
      v$,
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
    .error {
      color: red;
    }
  .formButton {
    right: 0;
  }
  }
}
</style>
