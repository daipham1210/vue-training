import { createStore } from 'vuex' 
import BookService from "@services/BookService";

const counterModule = {
  namespaced: true,
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
    },
    resetCounter(state) {
      state.counter = 0
    },
    
  },
  actions: { // chua async code
    // o trong component chi dc goi action
    increment({ commit }) {
      // setTimeout(function() {
      //   commit('increment')
      // }, 2000)
        commit('increment')
    },
    increase({ commit }, payload) {
      commit('increase', payload)
    },
    resetCounter({ commit }) {
      commit('resetCounter')
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
}

const authModule = {
  namespaced: true,
  state() {
    return {
      isLoggedIn: false
    };
  },
  mutations: {
    setAuth(state, payload) {
      state.isLoggedIn = payload.isAuth
    }
  },
  actions: { 
    login ({ commit }) {
      commit('setAuth', { isAuth: true })
    },
    logout ({ commit }) {
      commit('setAuth', { isAuth: false })
    }
  },
  getters: {
    userIsAuthenticated(state) {
      return state.isLoggedIn
    }
  }
}

const bookModule = {
  namespaced: true,
  state() {
    return {
      listBooks: []
    }
  },

  mutations: {
    setListBooks(state, payload) {
      state.listBooks = payload
    }
  },

  actions: {
    setListBooks ({ commit }, payload) {
      commit('setListBooks', payload)
    },

    async getListBooks ({ commit, rootGetters }, payload) {
      try {
        
        const response = await BookService.getBooks(payload);
        if (response.status === 200) {
          // /* eslint-disable no-debugger */
          // debugger
          const listBooks = rootGetters['books/listBooks']
          if (!listBooks.length) {
            commit('setListBooks', response.data)
          } else {
            commit('setListBooks', listBooks.concat(response.data))
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  },

  getters: {
    listBooks(state) {
      return state.listBooks
    }
  }
}
// store chinh
export default createStore({
  modules: {
    numbers: counterModule,
    auth: authModule,
    books: bookModule,
  },
  
})