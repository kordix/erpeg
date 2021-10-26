import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  data:{
      stamina: 100,
      maxstamina: 100,
      objects: [
        { id: 1, type: 'enemy', coords: { x: 1, y: 1 }, color: '#DD0000', maxlife: 80, life: 80, attack: 5, gold: 10 },
        { id: 2, type: 'enemy', coords: { x: 10, y: 10 }, color: '#FF6666', maxlife: 45, life: 40, attack: 5, gold: 5 },
        { id: 3, type: 'enemy', coords: { x: 12, y: 12 }, color: '#FF0000', maxlife: 60, life: 60, attack: 5, gold: 6 },
        { id: 4, type: 'factory', coords: { x: 10, y: 15 }, color: 'yellow', moneyfactor: 5 },
        { id: 5, type: 'shop', coords: { x: 15, y: 15 }, color: 'gray' }

      ],
      player:{coords:{x:5,y:10},attack:10,life:70 },
      money:50,
      exp:0,
      level:1,
      moves:0,
      currentEnemy:''

  },
  methods: {
    generateObject() {
      let id = this.objects[this.objects.length - 1].id
      let x = Math.floor(Math.random() * 20);
      let y = Math.floor(Math.random() * 20);

      let life = Math.floor(Math.random() * 100);

      let color = '';

      let gold = 15;
      let attack = 5;



      if(life > 0 && life <= 30){
        color = '#FF8888'
      }


      if(life > 30 && life <= 50){
        color = '#FF6666'
      }

      if(life > 51 && life <= 70){
        color = '#FF0000'
      }

      if(life > 71 && life <= 100){
        color = '#DD0000'
      }

    
      gold = Math.ceil(life / 10);

      attack = Math.ceil(life / 20);





      let obj = { id: id + 1, type: 'enemy', coords: { x: x, y: y }, color: color, maxlife: life, life: life, attack: attack, gold: gold }
      this.objects.push(obj)
    }
  },
  mounted() {
    // this.generateObject();
  },
  render: function (h) { return h(App) }
}).$mount('#app')
