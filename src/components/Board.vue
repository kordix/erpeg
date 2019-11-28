<template>
<div class="" style="margin:auto;width:440px">
    <p>Twoje życie:{{player.life}}</p> <p v-if="player.life <= 0">Przegrałeś życie weź coś na warsztat zamiast grać w tą wujową gierkę</p>
    <div class="row" v-for="y in 20">
        <field v-for="x in 20" :coord="{x:x,y:y}"></field>
        <div class="" style="clear:both"></div>
    </div>
    <div class="" v-if="showEnemyDialogue">
        Przeciwnik:{{enemyLife}}
    </div>

</div>

</template>

<script>
import Field from './Field.vue';
import {mapState} from 'vuex';

export default {
    components:{
        Field
    },
    data(){
        return {
            showEnemyDialogue:false
        }
    },
    computed:{
        ...mapState({
            player:'player',
            enemies:'enemies',
            currentEnemy:'currentEnemy'

        }),
        enemyLife(){
            if(this.enemies[this.currentEnemy]){
                return this.enemies[this.currentEnemy].life
            }else {
                return {}
            }
        }
    },
    methods:{
            move(keyCode){
                this.showEnemyDialogue=false;
                let self = this;
                let coordsNow = this.$store.state.player.coords;
                let coordsLater = JSON.parse(JSON.stringify(coordsNow));

                if(keyCode === 37){
    				coordsLater.x -=1;
    			}else if(keyCode === 38){
                    coordsLater.y -=1;
    			}else if(keyCode === 39){
    				coordsLater.x +=1;
    			}else if(keyCode === 40){
                    coordsLater.y +=1;
    			}

                for(let i=0;i<self.enemies.length;i++){
                    if(self.enemies[i].coords.x == coordsLater.x && self.enemies[i].coords.y == coordsLater.y){
                        self.attack(i);
                        self.$store.dispatch('test');
                        return
                    }
                }

                this.$store.state.player.coords.x = coordsLater.x;
                this.$store.state.player.coords.y = coordsLater.y;
            },
            attack(i){
                this.$store.state.currentEnemy=i;
                this.showEnemyDialogue=true;

                let enemy = this.enemies[i];
                console.log(enemy);

                enemy.life -= this.player.attack;
                this.player.life -= enemy.attack;
                if(enemy.life <= 0){
                    enemy.coords.x=1000;
                    enemy.coords.y=1000;

                }

            }
    },
    mounted () {
    		var self = this;
    		window.addEventListener("keyup", function(e){
                e.preventDefault();
                self.move(e.keyCode)
            })
        }}

</script>

<style>
</style>
