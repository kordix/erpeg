<template>
    <div style="display:inline-block;width:150px;height:20px;border:2px black solid">
            <div style="height:100%" :style="{width:ratio+'%',background:color }">
                <span :style="{color:fontcolor}">{{value}}</span>
            </div>
        
    </div>
</template>

<script>
export default {
    props:['value','maxvalue','color','fontcolor'],
    computed:{
        ratio(){
            return (this.value / this.maxvalue)*100
        }
    }
}
</script>