<template>
<div class="" style="margin:auto;width:440px">
    <div style="display:flex;justify-content:center" id="infos">
     <p>Kasa: {{money}}</p>  <p>Exp:{{exp}}</p>  
    </div>
    <p style="display:inline">Twoje życie:</p> <pasek :color="'red'" :fontcolor="'white'" :maxvalue="70" :value="player.life"></pasek>  <p v-if="player.life <= 0">Skończyło ci się życie koniec gry</p>
    
    <p></p>   

    <div class="row" v-for="y in 20">
        <field v-for="x in 20" :coord="{x:x,y:y}"></field>
        <div class="" style="clear:both"></div>
    </div>

    <div class="" v-if="showEnemyDialogue">
        Przeciwnik:<pasek :color="'blue'" :fontcolor="'white'" :maxvalue="50" :value="enemyLife" ></pasek>
    </div>
    <div v-if="showShopDialogue">
        <p>Kup ekwipinek</p>
    </div>
        <p style="font-size:10px">Ruchy:{{moves}}</p>

</div>

</template>

<script>
import Field from './Field.vue';
import Pasek from './Pasek.vue';

import {mapState} from 'vuex';

export default {
    components:{
        Field,Pasek
    },
    data(){
        return {
            showEnemyDialogue:false,
            interacted:false,
            processedObject:null,
            processedObjectIndex:null,
            showShopDialogue:false
        }
    },
    computed:{
        ...mapState({
            player:'player',
            objects:'objects',
            currentEnemy:'currentEnemy',
            moves:'moves',
            money:'money',
            exp:'exp'

        }),
        enemyLife(){
            if(this.objects[this.currentEnemy]){
                return this.objects[this.currentEnemy].life
            }else {
                return {}
            }
        }
    },
    methods:{
            move(keyCode){
                if(this.interacted){
                    return
                }
                if(this.player.life <= 0 ){
                    return
                }
                if([37,38,39,40].indexOf(keyCode) < 0 ){
                    return
                }

                this.showEnemyDialogue=false;
                this.showShopDialogue=false;
                let self = this;
                let coordsNow = this.$store.state.player.coords;
                let coordsLater = JSON.parse(JSON.stringify(coordsNow));

                if(keyCode === 37){
                    if(coordsNow.x==1){return}
    				coordsLater.x -=1;
    			}else if(keyCode === 38){
                    if(coordsNow.y==1){return}
                    coordsLater.y -=1;
    			}else if(keyCode === 39){
                    if(coordsNow.x==20){return}
    				coordsLater.x +=1;
    			}else if(keyCode === 40){
                    if(coordsNow.y==20){return}
                    coordsLater.y +=1;
                }else{
                    console.log('inny przycisk');
                    
                }
                
                this.$store.state.moves += 1;
                // console.log(coordsLater);
                
                this.processedObject = this.objects.find((el)=>el.coords.y == coordsLater.y && el.coords.x == coordsLater.x)
                this.processedObjectIndex = this.objects.findIndex((el)=>el.coords.y == coordsLater.y && el.coords.x == coordsLater.x)


                if(this.processedObject){
                    if(this.processedObject.type == 'enemy'){
                        console.log('enemy');
                        self.attack(this.processedObjectIndex);
                        return
                    }

                    if(this.processedObject.type == 'factory'){
                        this.$store.state.money += 1;
                    }

                    if(this.processedObject.type == 'shop'){
                        this.showShopDialogue = true;
                    }
                    return
                }
                
                // for(let i=0;i<self.objects.length;i++){
                //     if(self.objects[i].coords.x == coordsLater.x && self.objects[i].coords.y == coordsLater.y){
                //         self.attack(i);
                //         return
                //     }
                // }
                this.restorelife()
                this.$store.state.player.coords.x = coordsLater.x;
                this.$store.state.player.coords.y = coordsLater.y;
                
            },
            attack(i){
                this.$store.state.currentEnemy=i;
                this.showEnemyDialogue=true;

                let enemy = this.objects[i];
                console.log(enemy);

                enemy.life -= this.player.attack;
                this.player.life -= enemy.attack;
                if(enemy.life <= 0){
                    enemy.coords.x=1000;
                    enemy.coords.y=1000;
                    this.$store.state.exp += 10;    
                }
            },
            restorelife(){
                if(this.$store.state.player.life >= 70){
                    return
                }
                else this.$store.state.player.life += 1;
            }
    },
    mounted () {
    		var self = this;
    		window.addEventListener("keydown", function(e){
                // e.preventDefault();
                self.move(e.keyCode);
                self.interacted = true;
            })

            window.addEventListener("keyup",function(e){
                // e.preventDefault();
                self.interacted = false;
            })
        }}

</script>

<style>

#infos >p {
margin-right:5px;
}
</style>
