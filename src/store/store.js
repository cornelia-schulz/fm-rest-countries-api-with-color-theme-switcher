import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dark: false
  },
  
  getters: {
    // Here we will create a getter
  },
  
  mutations: {
    switchDisplayMode(state) {
      state.dark = !state.dark;
    }
  },
  
  actions: {
    switchDisplayMode(context) {
      context.commit('switchDisplayMode')
    }
  }
});