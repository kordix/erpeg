<template>
<div class="field" :class="{player:fieldPlayer}" :style="{background:fieldColor}"></div>


</template>

<script>
import {mapState} from 'vuex';

export default {
    props:['coord'],
    data(){
        return {
            fieldColor:'white'
        }
    },
    watch:{
        enemies:{
            deep:true,
            handler:function(){
                let self=this;
                self.generateColor();
                // console.log(this.en?emies[this.currentEnemy]);
            }
        }
    },
    computed:{
        ...mapState({
            player:'player',
            enemies:'enemies',
            currentEnemy:'currentEnemy'
        }),
        fieldPlayer(){
            if(this.coord.x == this.player.coords.x && this.coord.y == this.player.coords.y){
                return true
            }else {
                return false
            }
        }
    },
    methods:{
        generateColor(){
            console.log('gencolor');
            this.fieldColor='white';

            for(let i=0;i<this.enemies.length;i++){
                if(this.coord.x == this.enemies[i].coords.x && this.coord.y == this.enemies[i].coords.y){
                    this.fieldColor='red';
                }
            }
        }
    },
    mounted(){
        this.generateColor();
    }

}
</script>

<style>
.field{
    float:left;width:20px;height:20px;border:1px black solid;
}

.player{
    background:blue!important;
}

</style>
