import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    username: null,
    token: null
  },
  getters:{
     loggedIn: state => {
       return state.isLoggedIn;
     }
  },
  mutations: {
    IS_LOGGED_IN(state, data){
      state.isLoggedIn = data.value
      state.token =  data.token
      state.username= data.username
    },
    IS_LOGGED_CLEAR(state){
      state.isLoggedIn = false,
      state.token = null
    }
  },
  actions: {
      setLoggedIn({commit}, data){
        commit('IS_LOGGED_IN', data);
      },
      clearLoggedIn({commit}){
        commit('IS_LOGGED_CLEAR')
      }
  },
  modules: {
  }
})
