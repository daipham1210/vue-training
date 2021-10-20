<template>
  <div>
    <el-button @click="dialogVisible = true">
      Create Book
    </el-button>

    <el-dialog v-model="dialogVisible" title="Tips" width="30%">
      <div class="body">
        <form
          class="formBook"
          @submit.prevent="onSubmit"
        >
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
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="onSubmit"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, toRefs, reactive } from "vue";
import BookService from "@services/BookService";
// import useEmitter from "@/composables/useEmitter";
export default defineComponent({
  name: "CreateBookButton",
  components: {
  },
  setup(_, { emit }) {
    // const vm = getCurrentInstance().proxy
    // const bus = useEmitter();

    const data = reactive({
      dialogVisible: false,
      bookData: {},
    });

    const onSubmit = () => {
      // call api save book
      BookService.createBook(data.bookData)
        .then(function(response) {
          // emit('createData', data.bookData = Object.assign({}, newValue))
          console.log(response)
          if (response.status === 201) {
          emit('addBook', response.data)
          }
          data.bookData.title = ''
          data.bookData.author = ''
          data.bookData.decription = ''

        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
      data.dialogVisible = false;
    };

    return {
      ...toRefs(data),
      onSubmit,
    };
  },
});
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
