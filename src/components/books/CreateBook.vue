<template>
  <book-form 
    :book-data="bookData" 
    @save-book="submitData"
  />
</template>

<script>
import { defineComponent, toRefs, reactive, getCurrentInstance } from 'vue'
import BookForm from "@components/books/BookForm.vue";
import BookService from "@services/BookService";
export default defineComponent({
	name: "CreateBook",
	components: {
		"book-form": BookForm
	},
	setup() {
    const vm = getCurrentInstance().proxy
    const data = reactive({
      bookData: {}
    })

    const submitData = (createBook) => { 
      BookService.createBook(createBook)
        .then(function(response) {
          vm.$router.push({ // redirect sang trang list books
            name: 'books'
          })
          // if (response.status === 201) {
          //   bus.emit("add-book", response.data);
          //   data.title = "";
          //   data.author = "";
          //   data.decription = "";
          // }
          console.log(response)
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
    }

    return {
      ...toRefs(data),
      submitData
	}
  },
})

</script>

<style scoped lang="scss"></style>
