<template>
  <div>
    <team-item
      v-for="team in listTeam"
      :id="team.id"
      :key="team.id"
      :name="team.name"
      :total="team.total"
    />
  </div>
</template>

<script>
import { defineComponent, toRefs, reactive } from 'vue'
import TeamItem from './TeamItem.vue'

export default defineComponent({
  name: 'ListTeam',
  components: {
    'team-item': TeamItem,
  },
 
  setup() {
    const data = reactive({
      listTeam: [
        {
          name: "Frontend Engineers",
          total: "2 Members",
          id: 1,
        },
        {
          name: "Backend Engineers",
          total: "3 Members",
          id: 2,
        },
        {
          name: "Client Engineers",
          total: "2 Members",
          id: 3,
        },
      ]
    })

    return {
      ...toRefs(data),
    }
  },
})
</script>

<style scoped lang="scss">

</style>
