<template>
  <div class="container">
    <div class="listTeam">
      <h1>
        {{ name }}
      </h1>
      <p>{{ total }}</p>
      <router-link :to="teamMembersLink">
        <button>View Member</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'TeamItem',
  props: {
    name: String,
    total: String,
    id: Number,
  },
  setup(props) {
    const teamMembersLink = computed(() => '/teams/' + props.id)

    return {
      teamMembersLink,
    }
  },
})
</script>


<style scoped lang="scss">
.container {
  .listTeam {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    margin-bottom: 20px;
  }
  button {
    padding: 10px;
    background-color: #1a037e;
    border: none;
    color:white;
    width: 30%;
  }

}
</style>