import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      money:50,
      exp:0,
      level:1,
      player:{coords:{x:5,y:10},attack:10,life:70 },
      objects:[
          {id:1, type:'enemy', coords:{x:1,y:1},color:'red', maxlife:80,life:80,attack:10,gold:10},
          {id:2,type:'enemy',coords:{x:10,y:10},color:'red',maxlife:50,life:50,attack:5,gold:5 },
          {id:3,type:'enemy',coords:{x:12,y:12},color:'red',maxlife:60,life:60,attack:8,gold:6 },
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
