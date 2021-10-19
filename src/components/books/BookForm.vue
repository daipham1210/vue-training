<template>
  <div class="container">
    <form class="formBook" :class="{ 'formCreate': isCreate }" @submit.prevent="submitData">
      <div class="formItem">
        <label>Name: </label>
        <input v-model="book.title" type="text" />
      </div>
      <div class="formItem">
        <label>Book Name: </label>
        <input v-model="book.author" type="text" />
      </div>
      <div class="formItem">
        <label>Description: </label>
        <input v-model="book.decription" type="textarea" />
      </div>
      <button v-if="!isCreate" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { defineComponent, toRefs, reactive, watch, computed } from "vue";
// import useEmitter from "@/composables/useEmitter";
// import BookService from '@services/BookService'

export default defineComponent({
  name: "BookForm",
  props: {
    bookData: {
      type: Object,
      required: true,
    }
    // buttonSubmitBook: false,
  },
  setup(props, { emit }) {
    // const bus = useEmitter();
    const data = reactive({
      book: {},
      isCreate: computed(() => !props.bookData.id)
    });

    const submitData = () => {
      emit('saveBook', data.book)
    }

    watch(
      () => props.bookData,
      (newValue) => {
        data.book = Object.assign({}, newValue)
      },
      { immediate: true }
      // khi watch 1 array hay object thi dung immediate: true
    )

    return {
      ...toRefs(data),
      submitData,
    };
  },
});
</script>

<style scoped lang="scss">
.container {
  // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 30px;
  right: 0;
  .formBook {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    &.formCreate { // .formBook.formCreate
      box-shadow: none;
    }
    padding: 10px;
    margin: -30px;
    .formItem{
      margin: 10px;
      input {
        width: 100%;
      }
    }
    button {
      padding: 10px;
      background-color: blueviolet;
      color: white;
    }
  }
}
// form {
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
//   padding: 10px;
//   margin-left: 50px;
//   .formBook {
//     margin: 10px;
//     input {
//       width: 100%;
//     }
//   }
//   button {
//     padding: 10px;
//     background-color: blueviolet;
//     color: white;
//   }
// }
</style>
