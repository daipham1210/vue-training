<template>
  <div class="container">
    <form class="formExperience">
      <h1>How was you learning experience?</h1>
      <p>{{ test }}</p>
      <div>
        <div><label>Your Name</label></div>
        <div>
          <input
            v-model="name"
            type="text"
          >
        </div>
        <div><h3>My learning experience was ...</h3> </div>
        <div>
          <input
            v-model="rating"
            type="radio"
            value="poor"
            class="poor"
          > Poor
        </div>
        <div>
          <input
            v-model="rating"
            type="radio"
            value="avergare"
            class="avergare"
          >  Average
        </div>
        <div>
          <input
            v-model="rating"
            type="radio"
            value="great"
            class="great"
          >  Great
        </div>
        <div>
          <button @click.prevent="submitSurvey">
            Submit
          </button>
        </div>
        <p v-if="isSubmit">
          Submit thành công
        </p>
      </div>
    </form>
  </div>
</template>

<script>

import { defineComponent, toRefs, reactive } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: "ExperienceVue",
  
  setup(_, { emit }) {

    const data = reactive ({
      name: '',
      rating: null,
      isSubmit: false,
      test: 'hello world',
    })

    const submitSurvey = () => {
      if (data.name != '' && data.rating != '') {
        emit('submitSurvey', {
          name: data.name,
          rating: data.rating,
        })
        console.log('name', data.name)
        console.log('rating', data.rating)
        const payloadObject = {
          name: data.name,
          rating: data.rating,
        }
        axios.post('https://vue-demo-df80a-default-rtdb.asia-southeast1.firebasedatabase.app/surveys.json', payloadObject)
        .then(function (response) {
          data.name = ''
          data.rating = null
          data.isSubmit = true
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }

    return {
      ...toRefs(data),
      submitSurvey,
    }

  }
})
</script>

<style scoped lang="scss">
.container {
  .formExperience {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    width: 500px;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    margin: 10px 0;
  }
  button {
    background-color: #390031;
    border: none;
    border-radius: 5px;
    color: white;
    padding: 15px;
  }
  .header {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 20px;
    width: 500px;
    border-radius: 10px;
  }
}
</style>