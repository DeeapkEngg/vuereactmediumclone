<template>
  <div class="box">
        <div v-for="(t,index) in tags" :key="index">
           <div class="tag" >{{t}}</div>
        </div> 
        
    </div>
</template>

<script>

export default {
    name: 'Tag',
    props: {
        tags: { type: Array}
    }
}

</script>
<style scoped>

 .box {
    display: flex;
    flex-wrap:wrap;
    justify-content: flex-start;
    box-sizing: border-box;
}
.tag{
    text-align: center;
    font-weight: 500;
    width: auto;
    height: 18px;
    margin: 10px;
    border: 1px solid #ddd;
    background: transparent;
    position:relative;
    color: #aaa;
    padding: 10px;
    font-size: 12px;
    border-radius: 10px;
  }

</style>