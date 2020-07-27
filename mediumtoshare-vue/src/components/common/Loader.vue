<template>
    <div class="box" v-if="isloading">
       Loading...
    </div>
</template>
<script>

export default {
    name: "Tiles",
    props:{
       isloading:{ type: Boolean, default: false}
    }
}
</script>
<style scoped>
.box{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: black;
    opacity: 0.5;
    margin-top: 20px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 74px;
}
</style>