<template>
  <div class="header">
    <h1>Submitted Experience</h1>
    <button @click="loadExperience">
      Load Submitmitted Experience
    </button>
    <input
      v-model="keyword"
      class="keywordExperience"
      type="text"
    >
    <div class="listExperince">
      <p v-if="isLoading">
        Loading...
      </p>
      <experience-item 
        v-for="(item, index) in listExperienceShow"
        :key="index"
        :name="item.name"
        :rating="item.rating"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from "vue";
import axios from "axios";
import ExperienceItem from "./ExperienceItem.vue";

export default defineComponent({
  name: 'SubmittedExperience',
  components: { 
    'experience-item': ExperienceItem,
  },
  props: {
    newSurvey: {},
  },
  
  setup(props) {
    const data = reactive({
      listExperience: [],
      listExperienceShow: [],
      isLoading: false,
      keyword: '',
    });

    const loadExperience = () => {
      data.isLoading = true
      axios
        .get(
          "https://vue-demo-df80a-default-rtdb.asia-southeast1.firebasedatabase.app/surveys.json"
        )
        .then(function(response) {
          if (response.data) { 
            data.isLoading = false
            }
          data.listExperience = Object.values(response.data);
          console.log("listExperience", data.listExperience);
          // handle success
          console.log(response);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .then(function() {
          // always executed
        });
    };

    watch(
      () => props.newSurvey,
      (newValue) => {
        if (newValue.name) {
          /* eslint-disable no-debugger */
          data.listExperience.unshift(newValue)
        }
      },
     
    )

    watch(
      () => data.listExperience, 
      (newValue) => {
        data.listExperienceShow = newValue
      }
    )

    watch(
      () => data.keyword, 
      (newValue) => {
        // nếu có keyword thì mình sẽ locj
        if(newValue) {
          data.listExperienceShow = data.listExperienceShow.filter((item) => item.name.includes(newValue))
        } else { // neu keyword rong thi sao
          data.listExperienceShow = data.listExperience
        }
      }
    )

    return {
      ...toRefs(data),
      loadExperience,
    };
  },
});
</script>

<style scoped lang="scss">
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
.listExperince {
  margin-top: 20px;
  padding: 10px;
  font-size: 20px;
}
.keywordExperience {
  margin-left: 30px;
  height: 20px;
}
</style>
