<template>
  <div class="listBook">
    <div
      v-for="item in listBooks" 
      :key="item.id"
      class="bookItem"
    >
      <div class="orderNumber">
        #1
      </div>
      <img
        src="https://via.placeholder.com/100"
        alt="placeholder"
      >
      <div class="bookInfo">
        <h3>{{ }}</h3>
        <div class="author">
          ¡Domina y comprende Git de una vez por todas!
        </div>
        <p class="description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
    </div>

    <button />
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import BookService from '../../services/BookService'

export default defineComponent({
  name: "Book",
  setup() {
    const data = reactive ({
     listBooks: []
    })

    onMounted(() => {
      getListBook()
    })

    const getListBook = () => {
      BookService.getBooks()
        .then(function(response) {
          // handle success
          console.log(response);
          data.listBooks = response.data
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
    };

    return {
      ...toRefs(data),
      getListBook,
    }
  },
});
</script>

<style lang="scss">
.listBook {
  .bookItem {
    display: flex;
    .orderNumber {
      align-self: center;
      margin-right: 10px;
      font-weight: 600;
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
