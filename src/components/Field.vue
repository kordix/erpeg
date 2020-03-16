<template>
<div class="field" :class="{player:fieldPlayer}" :style="{background:fieldColor}"></div>


</template>

<script>
import {mapState} from 'vuex';

export default {
    props:['coord'],
    data(){
        return {
            // fieldColor:'white',
            fieldObject:null
        }
    },
    watch:{
        objects:{
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
            objects:'objects',
            currentEnemy:'currentEnemy'
        }),
        fieldPlayer(){
            if(this.coord.x == this.player.coords.x && this.coord.y == this.player.coords.y){
                return true
            }else {
                return false
            }
        },
        fieldObjectC(){
            return this.objects.find((el)=>el.coords.x == this.coord.x && el.coords.y == this.coord.y)
        },
        fieldColor(){
            if(this.fieldObjectC){
                return this.fieldObjectC.color
            }else{
                return 'white'
            }
        }
    },
    methods:{
        generateColor(){
            // console.log('gencolor');
            // this.fieldColor='white';

            // for(let i=0;i<this.objects.length;i++){
            //     if(this.coord.x == this.objects[i].coords.x && this.coord.y == this.objects[i].coords.y){
            //         this.fieldColor='red';
            //     }
            // }
        }
    },
    mounted(){
        // this.getObject();
        // this.generateColor();
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
