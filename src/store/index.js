import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      money:0,
      exp:0,
      level:1,
      player:{coords:{x:5,y:10},attack:10,life:70 },
      objects:[
          {id:1, type:'enemy', coords:{x:1,y:1},color:'red', life:50,attack:5 },
          {id:2,type:'enemy',coords:{x:10,y:10},color:'red',life:50,attack:5 },
          {id:3,type:'enemy',coords:{x:12,y:12},color:'red',life:50,attack:5 },
          {id:4,type:'factory',coords:{x:10,y:15},color:'yellow',moneyfactor:5},
          { id: 5, type: 'shop', coords: { x: 15, y: 15 }, color: 'gray' }

      ],
      currentEnemy:null,
      test:'',
      moves:0
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
