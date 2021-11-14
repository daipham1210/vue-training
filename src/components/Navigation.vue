<template>
  <nav class="navigation">
    <ul>
      <li>
        <router-link to="/friends">
          Friends
        </router-link>
      </li>
      <li>
        <router-link to="/surveys">
          Surveys
        </router-link>
      </li>
      <li>
        <router-link to="/listgoals">
          List Goals
        </router-link>
      </li>
      <li>
        <router-link to="/teams">
          Team
        </router-link>
      </li>
      <li>
        <router-link to="/books">
          Book
        </router-link>
      </li>
      <li>
        <router-link to="/book-panigition">
          List-book
        </router-link>
      </li>
    </ul>
  </nav>  
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Navigation',
  setup() {
    
  },
})
</script>

<style scoped lang="scss">
.navigation {
  background-color: #11005c;
  color: white;

  ul {
    width: 100%;
    list-style-type: none;
    display: flex;
    justify-content: center;
  }
  li {
    display: inline;
    padding: 20px;
    a {
      color: white;
      text-decoration: none;
      padding: 10px;
      border: 1px solid #11005c;
    }
    a:hover, a.active {
      color: #f1a80a;
      border-color: #f1a80a;
      background-color: #1a037e;
      border: 1px solid #f1a80a;
    }
  }
}
</style>