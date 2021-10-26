<template>
<div>
    <p v-if="errors" v-for="error in errors">{{error}}</p>
    <button @click="buy(0)">Kup topór (+3) 20g</button><br>
    <button @click="buy(1)">Eliksir (+10HP) 10g</button>

</div>
</template>

<script>

export default {
    data() {
        return {
            errors:[],
            items: [{
                id: 1,
                code:'axe',
                error:'',
                name: "topór",
                price: 20,
                attack: 3,
                life:0
            },
            {
                id: 2,
                code:'hppotion',
                error:'',
                name: "eliksir",
                price: 10,
                attack: 0,
                life:10
                
            }
            
            
            ],
        }
    },
    methods: {
        buy(index) {
            let item = this.items[index];
            if (this.$root.money >= item.price) {
                this.$root.money -= item.price;
                this.$root.player.attack += item.attack;
                this.$root.player.life += item.life;

                this.errors.push('kupiono '+item.name)
            }else{
                this.errors.push('Nie masz tyle kasy'); 
            }
        },
    },
    mounted(){
        this.error = ''
    },
    computed: {
  
    }
};
</script>

<style scoped>
</style>
