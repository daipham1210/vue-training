<template>
  <div class="container">
    <label for="goal">Goal</label> 
    <input
      id="goal"
      v-model="enteredValue"
      type="text"
      class="inputGoal"
      :class="isInvalid ? 'error' : '' "
    > 
    <p
      v-if="isInvalid"
      class="inputGoalLabel"
    > 
      Hay nhap goal!
    </p>
    <button @click="addGoal">
      Add Goal
    </button> 
    <button @click="removeGoal">
      Remove Goal
    </button> 
    <ul>
      <li
        v-for="(goal, index) in listGoalFilter"
        :key="index"
        class="goal-item"
      >
        <span class="goalName">{{ goal }}  </span>
        {{ index % 2 === 0 ? 'le' : 'chan' }}
        {{ index }}
        <i
          class="fas fa-times"
          @click="deleteGoal(goal)"
        />
      </li>
    </ul>
    <p>
      {{ numberOfGoal }}
    </p> 
    <input
      v-model="keyword"
      type="text"
    >
  </div>
</template>

<script>
import { defineComponent , toRefs, reactive, onMounted, watch, getCurrentInstance, computed  } from 'vue'

export default defineComponent({
  name: 'ListGoal',
  prop: {
  },
  setup() {
    const vm = getCurrentInstance().proxy // lay ra instance cua chinh component trong file nay
    const data = reactive({
      goals: [],
      enteredValue:'',
      a: false,
      isInvalid: false,
      keyword:'',
      listGoalFilter:computed(() => {
        return data.goals.filter((item) => item.includes(data.keyword))
      }),
      numberOfGoal: computed(() => `Number of goal: ${data.goals.length}`),
    })

    watch(
      () => data.goals,
      (newValue) => {
        if (newValue.length === 5) {
          alert("chuc mung ban")
        }
      },
      {
        deep: true // khi theo dõi của array hoặc object dùng deep true
      },
     
    )

    // watch(
    //   () => data.keyword,
    //   (newValue) => {
    //     if (newValue) {
    //       data.goals = data.goals.filter((item) => item.includes(data.keyword))
    //     }
    //   },
    // )

    onMounted(() => {
        // gọi api hoặc init data
      vm.$nextTick(() => { //nexttick được dùng khi cần kiểm tra dom đã được render hay chưa
        console.log('DOM rendered');
        // const appDiv = document.querySelector('.listGoals')
        console.log(this.$refs)
        // appDiv.style.height = '1000px'
      })
      console.log('mounted');
    })
              
    const addGoal = () => {
      if (data.enteredValue.replace(/\s/g, '').length) {
        data.isInvalid = false
        data.goals.push(data.enteredValue)
      } else {
        data.isInvalid = true
      }
      data.enteredValue = '' // reset vuale input
    }

    const deleteGoal = (goal) => {
      data.goals = data.goals.filter((item) =>{
        return item !== goal // true thi giu lai trong arr, false thi loai bo
      })
    }
    
    const removeGoal = () => {
      data.goals = []
    }

    return {
      removeGoal,
      addGoal,
      deleteGoal,
      ...toRefs(data),
    }
  },
})

</script>
    
<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  align-items: center;
  input {
    width: 190px;
  }
  button {
    width: 200px;
    margin: 5px;
  }
}

.inputGoalLabel {
  color:red;
  margin-top: 5px;
}

.error {
  border: 1px solid red;
}

.goalName {
  white-space: nowrap; 
  width:  calc(100% - 50px);
  overflow: hidden;
  text-overflow: ellipsis; 
}
 </style>
