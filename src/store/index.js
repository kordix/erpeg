import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      player:{coords:{x:5,y:10},attack:10,life:70 },
      enemies:[
          {coords:{x:7,y:10},life:50,attack:5 },
          {coords:{x:10,y:10},life:50,attack:5 },
          {coords:{x:12,y:12},life:50,attack:5 }
      ],
      currentEnemy:null,
      test:''
  },
  mutations: {
      test(state){
          state.test='test';
      }
  },
  actions: {
      test(context){
          context.commit('test');
      }
  },
  modules: {
  }
})
