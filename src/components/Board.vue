<template>
  <div class style="margin:auto;width:800px">
    <div style="display:flex;justify-content:center" id="infos">
      <p><b> Kasa: </b> {{$root.money}}</p>
      <p><b>Wynik: </b> {{$root.exp}}</p>
    </div>
    <p style="display:inline">Twoje życie:</p>
    <pasek :color="'red'" :fontcolor="'white'" :maxvalue="70" :value="$root.player.life"></pasek>
    <p>Atak: {{$root.player.attack}}</p>
    <p v-if="$root.player.life <= 0"><b> Skończyło ci się życie koniec gry</b><button @click="$root.save()">Zapisz wynik</button></p>
    <p style>
      Stamina:
      <pasek :color="'blue'" :fontcolor="'white'" :maxvalue="$root.maxstamina" :value="$root.stamina"></pasek>
    </p>

    <p></p>

    <div id="main" style="display:flex">
      <div id="plansza" style="flex:90%;">
        <div class="row" v-for="y in 20">
          <field v-for="x in 20" :coord="{x:x,y:y}"></field>
          <div class style="clear:both"></div>
        </div>
      </div>
      <div style="flex:50%;border:1px black solid;height:300px;align-items:center;margin:auto" v-if="showShopDialogue">
          <shop></shop>
      </div>
    </div>

    <div class v-if="showEnemyDialogue">
      Przeciwnik:
      <pasek
        :color="'blue'"
        :fontcolor="'white'"
        :maxvalue="processedObject.maxlife"
        :value="enemyLife"
      ></pasek>
     <b> Atak: </b>{{processedObject.attack}}
    </div>

    <!-- <button>Eliksir (10HP) </button> -->

    <p style="font-size:10px">Ruchy:{{$root.moves}}</p>
  </div>
</template>

<script>
import Field from "./Field.vue";
import Pasek from "./Pasek.vue";
import Shop from "./Shop.vue";

export default {
  components: {
    Field,Pasek,Shop
  },
  data() {
    return {
      showEnemyDialogue: false,
      interacted: false,
      processedObject: null,
      processedObjectIndex: null,
      showShopDialogue: false,
    };
  },
  computed: {
    enemyLife() {
      if (this.$root.objects[this.$root.currentEnemy]) {
        return this.$root.objects[this.$root.currentEnemy].life;
      } else {
        return {};
      }
    },
  },
  methods: {
    move(keyCode) {
      if (this.interacted) {
        return;
      }
      if (this.$root.player.life <= 0) {
        return;
      }
      if ([37, 38, 39, 40].indexOf(keyCode) < 0) {
        return;
      }

        if(this.$root.moves % 10 == 0){
            console.log('powinno genneroać enemy bo jest podzielne przez 10');
            this.$root.generateObject()
        }

      this.showEnemyDialogue = false;
      this.showShopDialogue = false;
      let self = this;
      let coordsNow = this.$root.player.coords;
      let coordsLater = JSON.parse(JSON.stringify(coordsNow));

      if (keyCode === 37) {
        if (coordsNow.x == 1) {
          return;
        }
        coordsLater.x -= 1;
      } else if (keyCode === 38) {
        if (coordsNow.y == 1) {
          return;
        }
        coordsLater.y -= 1;
      } else if (keyCode === 39) {
        if (coordsNow.x == 20) {
          return;
        }
        coordsLater.x += 1;
      } else if (keyCode === 40) {
        if (coordsNow.y == 20) {
          return;
        }
        coordsLater.y += 1;
      } else {
        console.log("inny przycisk");
      }

      this.$root.moves += 1;
      // console.log(coordsLater);

      this.processedObject = this.$root.objects.find(
        (el) => el.coords.y == coordsLater.y && el.coords.x == coordsLater.x
      );
      this.processedObjectIndex = this.$root.objects.findIndex(
        (el) => el.coords.y == coordsLater.y && el.coords.x == coordsLater.x
      );

      if (this.processedObject) {
        if (this.processedObject.type == "enemy") {
          console.log("enemy");
          self.attack(this.processedObjectIndex);
          return;
        }

        if (this.processedObject.type == "factory") {
          if (this.$root.stamina > 0) {
            this.$root.money += 2;
            this.$root.stamina -= 10;
            this.restorelife();
          }
        }

        if (this.processedObject.type == "shop") {
          this.showShopDialogue = true;
        }

      

        return;
      }

      // for(let i=0;i<self.objects.length;i++){
      //     if(self.objects[i].coords.x == coordsLater.x && self.objects[i].coords.y == coordsLater.y){
      //         self.attack(i);
      //         return
      //     }
      // }
      this.restorelife();
      this.restore("stamina");
      this.$root.player.coords.x = coordsLater.x;
      this.$root.player.coords.y = coordsLater.y;
    },
    attack(i) {
      this.$root.currentEnemy = i;
      this.showEnemyDialogue = true;

      let enemy = this.$root.objects[i];
      console.log(enemy);

      enemy.life -= this.$root.player.attack;
      this.$root.player.life -= enemy.attack;
      if (enemy.life <= 0) {
        enemy.coords.x = 1000;
        enemy.coords.y = 1000;
        this.$root.exp += enemy.attack;
        this.$root.money += enemy.gold;
      }
    },
    restorelife() {
      if (this.$root.player.life >= 70) {
        return;
      } else this.$root.player.life += 1;
    },
    restore(param) {
      if (this.$root[param] >= this.$root["max" + param]) {
        return;
      } else {
        this.$root[param] += 1;
      }
    },
  },
  mounted() {
    var self = this;
    window.addEventListener("keydown", function (e) {
      // e.preventDefault();
      self.move(e.keyCode);
      self.interacted = true;
    });

    window.addEventListener("keyup", function (e) {
      // e.preventDefault();
      self.interacted = false;
    });

            this.$root.generateObject()
            this.$root.generateObject()
            this.$root.generateObject()

  },
};
</script>

<style>
#infos > p {
  margin-right: 5px;
}
</style>
