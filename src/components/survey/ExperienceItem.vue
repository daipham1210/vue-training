<template>
  <p class="info">
    <strong>{{ name }}</strong> rated the learning experience
    <span :class="rating">{{ rating }}</span>
  </p>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExperianceItem',
  props: {
    name: String,
    rating: String,
  },

  setup() {
      
  },
})
</script>


<style scoped lang='scss'>
.info {
  border: 1px solid black;
  padding: 5px;
  .poor {
    color: red;
  }
  .avergare {
    color: blue;
  }
  .great {
    color: blueviolet;
  }
}
</style>