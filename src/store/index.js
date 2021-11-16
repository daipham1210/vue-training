import { createStore } from 'vuex' 

export default createStore({
  state() {
    return {
      counter: 2
    };
  },
  mutations: { // chua cac function de update state, muon update state phai goi thong qua mutation
    // ko chua async code (goi API, setTimeout, promise...)
    // pure function (voi 1 dau vao xac dinh thi se tra ve ket qua xac dinh)
    // dieu nay giup ta du doan dc thay doi cua state
    increment(state) {
      state.counter = state.counter + 1;
    },
    increase(state, payload) {
      state.counter = state.counter + payload.value;
    }
  },
  actions: { // chua async code
    // o trong component chi dc goi action
    increment({ commit }) {
      setTimeout(function() {
        commit('increment')
      }, 2000)
    },
    increase({ commit }, payload) {
      commit('increase', payload)
    }
  },
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