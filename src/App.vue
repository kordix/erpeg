<template>
  <div id="app">
      <p>Tu będzie erpeg</p>
      <board></board>
      <ul>
        <li>-Losowi przeciwnicy </li>
        <li>-Sklep</li>
        <li>Stamina</li>
      </ul>
  </div>
</template>

<script>
import Board from './components/Board.vue';

export default {
  name: 'app',
  data:{
    stamina:100
  },
  components: {
        Board
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
