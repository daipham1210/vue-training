<template>
  <div>
    <experience-vue 
      @submit-survey="submitSurvey"
    />
    <submitted-experience 
      :new-survey="newSurvey"
    />
  </div>
</template>

<script>

import { defineComponent, toRefs, reactive } from 'vue'
import SubmittedExperience from './SubmittedExperience.vue'
import ExperienceVue from './ExperienceVue.vue'

export default defineComponent({
  name:' SurveyLearning',
  components: {
    'experience-vue' : ExperienceVue,
    'submitted-experience' : SubmittedExperience,
  },

  setup() {

    const data = reactive({
      newSurvey: {},
    })
   
    const submitSurvey = (newSurvey) => {
      data.newSurvey = newSurvey
    }

    return {
      ...toRefs(data),
      submitSurvey,
    }

  },

})

 
</script>

<style scoped lang="scss"></style>
