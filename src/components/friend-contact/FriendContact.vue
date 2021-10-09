<template>
  <div class="wrapper">
    <div class="friend-item">
      <h1> {{ friend.name }} <span v-if="isFavorite"> (favorite) </span></h1>
      <hr>
      <button @click="toggleFavorite(friend.id, friend.name)">
        Toggle Favorite
      </button>
      <button @click="toggleShowDetails"> 
        <span v-if="isShowDetails">
          Hide Details
        </span>
        <span v-else>Show Details</span>
      </button>
      <div v-if="isShowDetails">
        <div class="phone-friend">
          <p><strong> Phone: </strong>{{ friend.phone }} </p>
        </div>
        <div class="name-friend">
          <p><strong> Email: </strong> {{ friend.email }} </p>
        </div>
      </div>
      <button
        class="btnRemove"
        @click="removeFriend"
      >
        Delede Friend
      </button>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
export default defineComponent({
  name: "FriendContact",
  props: {
    // id: {
    //   type: String,
    //   required: true,
    // },
    // name: {
    //   type: String,
    //   required: true,
    // },
    // phone: {
    //   type: String,
    //   required: true,
    // },
    // email: {
    //   type: String,
    //   required: true,
    // }
    friend: {
      type: Object,
      required: true,
    }
  },
  setup(props, { emit }) {
    const data = reactive({
      isShowDetails: false,
      isFavorite: false,
    })

    const toggleShowDetails = () => data.isShowDetails = !data.isShowDetails

    const toggleFavorite = (friendId, friendName) => {
      data.isFavorite = !data.isFavorite
      emit('toggleFavorite', {
        id: friendId,
        isFavorite: data.isFavorite,
        name: friendName,
      })
      // emit('actionName', actionData, actionData1, actionData2, actionData3)
      // actionName là tên của emit action, component con sẽ gọi emit và component cha lắng nghe emit và thực 
      // hiện hàm callback 
    }

    onMounted(() => {
      data.isFavorite = props.friend.isFavorite
    })

    const removeFriend = () => {
      emit('removeFriend', props.friend.id)
      
    }
    return {
      ...toRefs(data),
      removeFriend,
      toggleShowDetails,
      toggleFavorite,
    }
  },
  
})
</script>

<style scoped lang="scss">
.friend-item {
  background-color: #FFFFFF;
  color: #AB526B;
  text-align: center;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin-top: 10px;
  width: 100%;
  border-radius: 5px;
  h1 {
    font-size: 25px;
  }
  hr {
    height: 1px;
  }
  button {
    background-color: #FF0577;
    border: none;
    margin: 2px;
    color: #FFFFFF;
    border-radius: 2px;
  }
  .btnRemove {
    background-color: red;
  }
}
.phone-friend {
  width: 70%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 0 auto;
  background-color: #FFFFFF;
  border-radius: 3px;
  padding: 5px;
  margin-top: 5px;
  color: black;
}
.name-friend {
  width: 70%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 0 auto;
  background-color: #FFFFFF;
  border-radius: 3px;
  padding: 5px;
  margin-top: 5px;
  color: black;
}
</style>