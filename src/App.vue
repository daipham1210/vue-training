<template>
  <navigation />
  <div class="container">
    <router-view />
  </div>

  <!-- <div>
    <p>
      If Element Plus is successfully added to this project, you'll see an
      <code v-text="'<el-button>'"></code>
      below
    </p>
    <el-button type="primary">el-button</el-button>
  </div> -->
</template>

<script>
import Navigation from './components/Navigation.vue'

export default {
  name: 'App',
  components: {
    'navigation' : Navigation,
  },
}
</script>

<style scoped lang="scss">
.container{
  margin: 0 auto;
  width: 500px;
}
</style>