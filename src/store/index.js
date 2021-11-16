import { createStore } from 'vuex' 

export default createStore({
  state() {
    return {
      counter: 2
    };
  },
  mutations: { // chua cac function de update state, muon update state phai goi thong qua mutation
    increment(state) {
      state.counter = state.counter + 1;
    },
    increase(state, payload) {
      state.counter = state.counter + payload.value;
    }
  },
  // actions: {
  //   increment(context) {
  //     setTimeout(function() {
  //       context.commit('increment');
  //     }, 2000);
  //   },
  //   increase(context, payload) {
  //     console.log(context);
  //     context.commit('increase', payload);
  //   }
  // },
  getters: { // ham get cac gia tri dua tren state
    finalCounter(state) {
      return state.counter * 3;
    },
    // normalizedCounter(_, getters) {
    //   const finalCounter = getters.finalCounter;
    //   if (finalCounter < 0) {
    //     return 0;
    //   }
    //   if (finalCounter > 100) {
    //     return 100;
    //   }
    //   return finalCounter;
    // }
  }
})