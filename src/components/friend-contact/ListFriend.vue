<template>
  <div class="listFriend">
    <div class="header">
      <h1>My Friend</h1>
      <h1>Total Favorite: {{ totalFavorite }}</h1>
      <ul>
        <li 
          v-for="(friendItem, index) in listFavoriteFriends" 
          :key="index" 
          class="nameFriend"
        >
          {{ friendItem }}
        </li>
      </ul>
    </div>
    <new-friend 
      ref="newFriend"
      @add-friend="addFriend"
    />
    <friend-contact 
      v-for="friend in friends"
      :key="friend.id" 
      :friend="friend"
      @toggle-favorite="updateFavorite"
      @remove-friend="removeFriend"
    />
    <!-- emit action khai báo kiểu camelCase, ở bên component cha viết kiểu "@emit-action" -->
    <!-- :name="friend.name"
      :id="friend.id"
      :phone="friend.phone"
      :email="friend.email" -->
  </div>
</template>

<script>
import { defineComponent, computed, reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import FriendContact from '@components/friend-contact/FriendContact.vue'
import NewFriend from '@components/friend-contact/NewFriend.vue'

export default defineComponent({
  name: 'ListFriend',
  components: {
    'friend-contact' : FriendContact,
    'new-friend' : NewFriend,
  },
  setup() { 
    // goi API
    const data = reactive({
      friends: [
        {
          id: 'manuel',
          name: 'Manuel Lorenz',
          phone: '0123 45678 90',
          email: 'manuel@localhost.com',
          isFavorite: true,
        },
        {
          id: 'julie',
          name: 'Julie Jones',
          phone: '0987 654421 21',
          email: 'julie@localhost.com',
          isFavorite: false,
        },
      ],
      totalFavorite: computed(() => data.friends.filter((friend) => friend.isFavorite).length),
      // listFavoriteFriends: computed(() => data.friends.filter((friend) => friend.isFavorite)),
      listFavoriteFriends: [],
    })

    const vm = getCurrentInstance().proxy

    const updateFavorite = (updateData) => {
      // console.log(updateData1);
      // console.log(updateData2);
      // console.log(updateData3);
      // updatedata = {
      //   id: friendId,
      //   isFavorite: data.isFavorite,
      //   name: friendName,
      // },
      const updateFriend = data.friends.find((friend) => friend.id === updateData.id)
      updateFriend.isFavorite = updateData.isFavorite
      if (updateData.isFavorite && !data.listFavoriteFriends.includes(updateData.name)) {
        data.listFavoriteFriends.push(updateData.name)
      } else {
        data.listFavoriteFriends =  data.listFavoriteFriends.filter((item) => item !== updateData.name)
      }

    }

    onMounted(() => {
      console.log("vm.refsssss", vm.$refs.newFriend.name);
      // vm.$refs.newFriend
    })

    const addFriend = (newFriend) => {
      data.friends.push(newFriend)
    }

    const removeFriend = (friendID) => {
      data.friends = data.friends.filter((item) => item.id !== friendID)
    }

    return {
      ...toRefs(data),
      addFriend,
      removeFriend,
      updateFavorite,
    }
  }
})

</script>

<style lang="scss" scoped>
.header {
  border-radius: 5px;
  background-color: #5C014C;
  width: 100%;
  color: #ffffff;
  text-align: center;
  font-size: 12px;
  padding: 10px;
  .nameFriend {
    font-size: 25px;
    text-align: left;
    list-style-type: none;
  }
}


</style>