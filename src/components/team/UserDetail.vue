<template>
  <div class="header">
    <div class="formFriend">
      <label>Phone: {{ user.phoneNumber }} </label>
    </div>
    <div class="formFriend">
      <label>E-mail: {{ user.email }} </label>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRefs, reactive, onMounted, getCurrentInstance } from 'vue'

export default defineComponent({
  name: "UserDetail",
  setup() {
    const vm = getCurrentInstance().proxy
    const data = reactive ({
      userDetail: [
        { 
          id: 'u1', fullName: 'Max Schwarz', role: 'Engineer', 
          phoneNumber: '9999999999', email: 'aaaa@ass.ss', teamId: 1
        },
        { 
          id: 'u2', fullName: 'Praveen Kumar', role: 'Engineer',
          phoneNumber: '222222', email: '2222222@ass.ss', teamId: 2, 
        },
        { 
          id: 'u3', fullName: 'Julie Jones', role: 'Engineer',
          phoneNumber: '11111111', email: '11111@ass.ss', teamId: 3, 
        },
        { 
          id: 'u4', fullName: 'Alex Blackfield', role: 'Consultant',
          phoneNumber: '00000000', email: '0000a@0000.ss', teamId: 1, 
        },
        { 
          id: 'u5', fullName: 'Marie Smith', role: 'Consultant', teamId: 2, 
        },
      ],
      user: {},
    })

     onMounted(() => {
      // lay params tren url
      // thuong khi vao trang detail se goi api get detail dua tren id
      // gan userMembers thoe teamId
      const userID = vm.$route.params.userId
      // data.userMembers = users.filter((item) => item.teamId === teamId) 

      // filter tra ve 1 array
      // find tra ve chinh item trong array do
      data.user = data.userDetail.find((item) => item.id === userID)
    })

    return {
      ...toRefs(data),
    }
      
  },
})
</script>

<style scoped lang="scss">
.header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 30px;
  .formFriend {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin-bottom: 10px;
  padding: 10px;
  }
}
</style>
// path: users/:id