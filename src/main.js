import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  data:{
      stamina: 100,
      maxstamina: 100,
      objects: [
        { id: 1, type: 'enemy', coords: { x: 1, y: 1 }, color: 'red', maxlife: 80, life: 80, attack: 10, gold: 10 },
        { id: 2, type: 'enemy', coords: { x: 10, y: 10 }, color: 'red', maxlife: 50, life: 50, attack: 5, gold: 5 },
        { id: 3, type: 'enemy', coords: { x: 12, y: 12 }, color: 'red', maxlife: 60, life: 60, attack: 8, gold: 6 },
        { id: 4, type: 'factory', coords: { x: 10, y: 15 }, color: 'yellow', moneyfactor: 5 },
        { id: 5, type: 'shop', coords: { x: 15, y: 15 }, color: 'gray' }

      ],

  },
  methods: {
    generateObject() {
      let id = this.objects[this.objects.length - 1].id
      let x = Math.floor(Math.random() * 20);
      let y = Math.floor(Math.random() * 20);

      let obj = { id: id + 1, type: 'enemy', coords: { x: x, y: y }, color: 'red', maxlife: 100, life: 100, attack: 12, gold: 15 }
      this.objects.push(obj)
    }
  },
  mounted() {
    // this.generateObject();
  },
  render: function (h) { return h(App) }
}).$mount('#app')
