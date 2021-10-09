<template>
  <div class="container">
    <h1>Frontend Engineers</h1>
    <router-link
      v-for="item in userMembers"
      :key="item.id"
      :to="userDetailLink(item.id)"
    >
      <div class="nameDetail">
        <h2>{{ item.fullName }}</h2>
        <label>{{ item.role }}</label>
      </div>
    </router-link>
  </div>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  toRefs,
} from "vue";

export default defineComponent({
  name: "TeamDetail",
  setup() {
    const vm = getCurrentInstance().proxy;
    const users = [
      {
        id: "u1",
        fullName: "Max Schwarz",
        role: "Engineer",
        phoneNumber: "9999999999",
        email: "aaaa@ass.ss",
        teamId: 1,
      },
      {
        id: "u2",
        fullName: "Praveen Kumar",
        role: "Engineer",
        phoneNumber: "9999999999",
        email: "aaaa@ass.ss",
        teamId: 2,
      },
      {
        id: "u3",
        fullName: "Julie Jones",
        role: "Engineer",
        phoneNumber: "9999999999",
        email: "aaaa@ass.ss",
        teamId: 3,
      },
      {
        id: "u4",
        fullName: "Alex Blackfield",
        role: "Consultant",
        phoneNumber: "9999999999",
        email: "aaaa@ass.ss",
        teamId: 1,
      },
      { id: "u5", fullName: "Marie Smith", role: "Consultant", teamId: 2 },
    ];

    const data = reactive({
      userMembers: [],
    });

    onMounted(() => {
      // lay params tren url
      // thuong khi vao trang detail se goi api get detail dua tren id
      // gan userMembers thoe teamId
      const teamId = Number(vm.$route.params.teamId);
      data.userMembers = users.filter((item) => item.teamId === teamId);
      // console.log(vm.$route.params.teamId)
    });

    const userDetailLink = (userId) => `/users/${userId}`;

    return {
      ...toRefs(data),
      userDetailLink,
    };
  },
});
</script>

<style scoped lang="scss">
.container {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 10px;
  border-radius: 10px;
  .nameDetail {
    border: 1px solid black;
    padding: 20px;
    margin-bottom: 10px;
    label {
      color: white;
      background-color: #0076bb;
      padding: 10px;
      border-radius: 20px;
    }
  }
}
</style>
