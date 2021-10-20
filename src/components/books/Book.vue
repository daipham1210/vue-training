<template>
  <div>
    <div class="header">
      <create-book-button 
        @add-book="createBook"
      />
      <div class="searchBook">
        <el-button type="primary" icon="el-icon-search">Search</el-button>
        <input class="headerButton" type="text" v-model="searchBook"/>
      </div>
    </div>
    <div class="listBook">
      <div class="bookItem" v-for="item in listBooksShow" :key="item.id">
        <div class="orderNumber">#1</div>
        <img  class="imgBook" src="https://via.placeholder.com/100" alt="placeholder" />
        <div v-if="!statusOpenEdit[item.id]" class="bookInfo">
          <h3>{{ item.title }}</h3>
          <div class="author">{{ item.author }}</div>
          <p class="description">
            {{ item.decription }}
          </p>
        </div>
        <div class="deleteBook">
          <el-button @click="editBook(item)">
            <span v-if="statusOpenEdit">
              Edit
            </span>
          </el-button>
          <el-button @click="deleteBook(item.id)">
            X
          </el-button>
        </div>
        <book-form
          v-if="statusOpenEdit[item.id]"
          :book-data="updateBook[item.id]"
          @save-book="submitUpdateBook"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
import BookService from "@services/BookService";
import BookForm from "@components/books/BookForm.vue";
// import useEmitter from "@/composables/useEmitter";
import CreateBookButton from "@components/books/CreateBookButton.vue";

export default defineComponent({
  name: "Book",
  components: {
    "book-form": BookForm,
    "create-book-button": CreateBookButton,
  },
  setup() {
    // const bus = useEmitter();
    const data = reactive({
      listBooks: [],
      statusOpenEdit: {},
      updateBook: {},
      searchBook: "",
      listBooksShow: [],
    });

    

    onMounted(() => {
      getListBook();
    });

    const createBook = (bookData) => {
      console.log('bokkkkkkkk', bookData)
      data.listBooks.push(bookData);
    };

    const getListBook = () => {
      BookService.getBooks()
        .then(function(response) {
          // handle success
          console.log('getListBook', response)
            data.listBooks = response.data;
            // data.searchBook = data.listBooks.filter((item) => item.title.includes(item))
            console.log('data.listBooks', data.searchBook)
      //       /* eslint-disable no-debugger */
      // debugger
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    };

     watch(
      () => data.listBooks, 
      (newValue) => {
        data.listBooksShow = newValue
      }
    )

    watch(
      () => data.searchBook, 
      (newValue) => {
        if(newValue) {
          data.listBooksShow = data.listBooksShow.filter((item) => item.title.includes(newValue))
        } else {
          data.listBooksShow = data.listBooks
        }
      }
    )


    const deleteBook = (id) => {
      BookService.deleteBook(id)
        .then(function(response) {
          // handle success
          console.log(response);
          data.listBooks = data.listBooks.filter((item) => item.id !== id);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    };

    const editBook = (item) => {
      data.statusOpenEdit[item.id] = !data.statusOpenEdit[item.id]; // true -> show form edit
      data.updateBook[item.id] = Object.assign({}, item); // copy data cua item sang update book
      console.log(data.updateBook);
    };

    const submitUpdateBook = (bookData) => {
      /* eslint-disable no-debugger */
      // data = ?
      // data = { a: 1, b: 2, c: 2 } phải năm đc data có cấu trúc như thế nào 
      BookService.updateBook(bookData.id, bookData)
        .then(function(response) {
          // handle success
          console.log(response);
          // Tìm item book trong list book cần update
          // gan data cho item book do
          const updateItemBook = data.listBooks.find((item) => item.id === bookData.id);
          console.log('aaa', updateItemBook)
          if (updateItemBook && response.status === 200) {
            updateItemBook.title = bookData.title
            updateItemBook.author = bookData.author
            updateItemBook.decription = bookData.decription
          }
          data.statusOpenEdit[bookData.id] = false
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    };

    // onMounted(() => {
    //   bus.on("add-book", createBook);
    // });

   

    return {
      ...toRefs(data),
      getListBook,
      deleteBook,
      editBook,
      submitUpdateBook,
      createBook,
    };
  },
});
</script>

<style lang="scss">
.header{
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
  .headerButton {
    height: 35px;
    font-size: 15px;
    margin-left: 5px;
    border-radius: 10px;
  }
}
.listBook {
  .bookItem {
    display: flex;
    padding-bottom: 20px;
    position: relative;
    .imgBook {
      width: 100px;
      height: 100px;
    }
    .orderNumber {
      margin-right: 10px;
      margin-top: 10px;
      font-weight: 600;
    }
    .deleteBook {
      position: absolute;
      right: 0;
      color: white;
      padding: 5px;
      button {
        margin-left: 10px;
        padding: 10px;
        background-color: blue;
      }
      
    }
    .editBook {
      margin-right: 10px;
    }
    .bookInfo {
      padding-left: 20px;
      h3 {
        margin: 0 0 10px 0;
      }
      .author {
        margin-bottom: 5px;
      }
      .description {
        margin: 0;
        font-size: 15px;
        color: #8b8b8b;
        font-weight: 400;
      }
    }
  }
}
</style>
