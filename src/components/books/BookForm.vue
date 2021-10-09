<template>
  <div class="container">
    <form
      class="theform"
      @submit.prevent="submitData"
    >
      <div class="formInputGroup formItem">
        <label>Book Name</label>
        <input
          v-model="name"
          type="text"
          name="name"
        >
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
      name: "",
    })

    const submitData = () => {
      debugger
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
