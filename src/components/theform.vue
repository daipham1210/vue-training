<template>
  <div class="container">
    <form
      class="theform"
      @submit.prevent="submitData"
    >
      <div class="formInputGroup formItem">
        <label>Your Name</label>
        <input
          v-model="userName"
          type="text"
          name="name"
        >
      </div>
      <div class="formInputGroup formItem">
        <label>Your Age (Years)</label>
        <input
          v-model="userAge"
          type="number"
          name="name"
        >
      </div>
      <div class="formInputGroup formItem">
        <label>How did you hear about us?</label>
        <select v-model="referrer">
          <option value="google">
            Google
          </option>
          <option value="wom">
            Word of mouth
          </option>
          <option value="newspaper">
            Newspaper
          </option>
        </select>
      </div>
      <div class="formCheckboxtGroup formItem">
        <div><label>What are you interested in?</label></div>
        <div 
          v-for="interestItem in listInterest" 
          :key="interestItem.value" 
        >
          <input 
            v-model="interest"  
            type="checkbox" 
            :value="interestItem.value" 
          >
          <span> {{ interestItem.text }} </span>
        </div>
      </div>
      <div class="formItem">
        <div><label>How do you learn?</label></div>
        <div
          v-for="sourceItem in listSource"
          :key="sourceItem.text"
        >
          <input 
            v-model="how" 
            type="radio" 
            :value="sourceItem.value"
          >
          <span> {{ sourceItem.text }}</span>
        </div>
      </div>
      <div class="formItem">
        <input
          v-model="confirmTerm"
          type="checkbox"
        > Agree to tems of use?
      </div>
      <div>
        <button class="formSaveGroup">
          Save Data
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: "TheForm",
  setup (){
    const data = reactive({
      listInterest: [
        {
          value:"news", text: "News"
        },
        {
          value: "tutorials", text: "Tutorials"
        },
        {
          value: "other", text: "Other"
        },
      ],
      listSource: [
        {
          value: "videoCourses", text: " Video Courses"
        },
        {
          value: "blogs", text: "Blogs"
        },
        {
          value: "other", text: "Other"
        },
      ],
      userName: "",
      userAge:  null,
      referrer: "google",
      interest: [],
      how: "blogs",
      confirmTerm: false,
    })

    const submitData = () => {
      console.log("userName",data.userName)
      console.log("userAge",data.userAge)
      console.log("referrer",data.referrer)
      /* eslint-disable no-debugger */
        debugger
      console.log("interest",data.interest)
      console.log("how",data.how)
      console.log("confirmTerm",data.confirmTerm)

      // userName = data.userName
      // userAge = data.userAge
      // referrer = data.referrer
      // interest = data.interest
      // how = data.how
      // confirmTerm = data.confirmTerm
    }

    return {
      submitData,
      ...toRefs(data),
      }
  }
  
})


</script>

<style scoped lang="scss">
.container {
  width: 500px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  height: 500px;
  border-radius: 10px;
  padding:20px;
  margin: 10px;
  .formInputGroup {
    flex-direction: column;
    display: flex;
    margin: 5px 0;
  }
  .formSaveGroup {
    background-color: #0076BB;
    border: none;
    border-radius: 20px;
    width: 90px;
    height: 40px;
    color: white;
  }
  label {
    font-weight: 600;
    margin-bottom: 10px;
  }
  .formItem {
    padding: 5px ;
  }
}
</style>
