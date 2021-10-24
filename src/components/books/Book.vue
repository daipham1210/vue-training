<template>
  <div>
    <div class="header">
      <el-button @click="showCreateModal">
        Create Book
      </el-button>
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
          <el-button @click="showEditModal(item)">
            <span v-if="statusOpenEdit">
              Edit
            </span>
          </el-button>
          <el-button @click="deleteBook(item.id)">
            X
          </el-button>
        </div>
      </div>
    </div>
    <book-form-modal
      v-model="isShowModal"
      :form-type="formModalType"
      :book-prop="bookEditData"
      @closed="showModal(false)"
      @submit-create-book="submitCreateBook"
      @submit-update-book="submitUpdateBook"
    />
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
import BookService from "@services/BookService";
import BookFormModal from "@components/books/BookFormModal.vue";
// import useEmitter from "@/composables/useEmitter";

export default defineComponent({
  name: "Book",
  components: {
    "book-form-modal": BookFormModal,
  },
  setup() {
    // const bus = useEmitter();
    const data = reactive({
      listBooks: [],
      statusOpenEdit: {},
      updateBook: {},
      searchBook: "",
      listBooksShow: [],
      isShowModal: false,
      formModalType: 'create',
      bookEditData: {},
    });
    
    onMounted(() => {
      getListBook();
    });

    const getListBook = async () => {
       try {
        const response = await BookService.getBooks()
        if (response.status === 200) {
          data.listBooks = response.data
        }
      } catch(err) {
        console.log(err)
      } 
    }

    const submitCreateBook = async (bookData) => {
      try {
        const response = await BookService.createBook(bookData)
        if (response.status === 201) {
          bookData.id = response.data.id
          data.listBooks.push(bookData)
        }
      } catch(err) {
        console.log(err)
      } finally {
        showModal(false)
      }
    }

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


    const deleteBook = async (id) => {
     try {
        const response = await BookService.deleteBook(id)
        if (response.status === 200) {
           data.listBooks = data.listBooks.filter((item) => item.id !== id);
        }
      } catch(err) {
        console.log(err)
      } 
    };

    const showCreateModal = () => {
      data.bookEditData = {}
      data.formModalType = 'create'
      showModal(true)
    }

    const showEditModal = (item) => {
      data.bookEditData = Object.assign({}, item)
      data.formModalType = 'update'
      showModal(true)
    }

    const submitUpdateBook = async (bookData) => {
      try {
        const response = await BookService.updateBook(bookData.id, bookData)
        if (response.status === 200) {
          const updateBook = data.listBooks.find((item) => item.id === bookData.id)
          Object.assign(updateBook, bookData)
        }
      } catch(err) {
        console.log(err)
      } finally {
        showModal(false)
      }
    };
    
    const showModal = (isShowModal) => {
      data.isShowModal = isShowModal
    }

    return {
      ...toRefs(data),
      getListBook,
      deleteBook,
      submitUpdateBook,
      showModal,
      showEditModal,
      submitCreateBook,
      showCreateModal,
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
