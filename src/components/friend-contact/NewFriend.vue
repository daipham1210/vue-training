<template>
  <!-- v-model lay du lieu trong input vào data -->
  <div class="formNewFriend">
    <form @submit.prevent="submitData">
      <!-- prevent ngăn cản những hành vi mặc định của thẻ html-->
      <div class="formFriend">
        <label>Name: </label>
        <input
          v-model="name"
          type="text"
          name="name"
        >
      </div>
      <div class="formFriend">
        <label>Phone: </label>
        <input
          v-model="phone"
          type="tel"
        >
      </div>
      <div class="formFriend">
        <label>E-mail: </label>
        <input
          v-model="email"
          type="email"
        >
      </div>
      <el-button
        type="primary"
      >
        Add Contact
      </el-button>
    </form>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({ 
  name: "NewFriend",
  prop: {
    newFriend: {
      type: Object,
      required: true,
    }
  },
//emit chỉ được khai báo trong setup
  setup(_,{ emit }) {
    const data = reactive({
      name: '',
      phone: '',
      email: '',
    })

    const submitData = () => {
      if (data.name !== '' && data.phone !== '' && data.email !== '') {
        emit('addFriend', {
          id: data.name + Date.now(),
          name: data.name,
          phone: data.phone,
          email: data.email,
        })
        data.id = ''
        data.name = '' 
        data.phone = ''
        data.email = ''
      }
    }

    // const toggleFavorite = (friendId, friendName) => { 
    //   emit('toggleFavorite', {
    //     id: friendId,
    //     isFavorite: data.isFavorite,
    //     name: friendName,
    //   })
    // }
    
    return {
      submitData, 
    ...toRefs(data),
  }
  },
  
})
</script>


<style scoped lang="scss">
.formNewFriend {
  background-color: #FFFFFF;
  margin: 10px 0;
  text-align: center;
  color: black;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 25px;
  box-sizing: border-box;
  width: 520px;
  .formFriend {
    margin: 5px 0,
  }
  .formFriendButton {
    background-color: #FF0577;
    border: none;
    color: white;
    padding: 5px;
  }
}
</style>