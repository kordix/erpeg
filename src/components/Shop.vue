<template>
<div>
    <p v-if="errors" v-for="error in errors">{{error}}</p>
    <button @click="buy(0)">Kup topór (+5) 20g</button>
</div>
</template>

<script>
import {
    mapState
} from 'vuex';

export default {
    data() {
        return {
            errors:[],
            items: [{
                id: 1,
                error:'',
                name: "topór",
                price: 20,
                attack: 3
            }],
        }
    },
    methods: {
        buy(index) {
            let item = this.items[index];
            if (this.$store.state.money >= item.price) {
                this.$store.state.money -= item.price;
                this.$store.state.player.attack += item.attack;
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
        ...mapState([
            'player'
        ]),
    }
};
</script>

<style scoped>
</style>
