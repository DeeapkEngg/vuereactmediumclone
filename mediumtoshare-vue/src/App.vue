<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {

name: 'App',
beforeCreate () {
   const token = window.localStorage.getItem('token') 
   if(token){
       const username =  JSON.parse(atob(token.split('.')[1])).username
       const obj = {
                        value : true,
                        token,
                        username
         }
      this.$store.dispatch('setLoggedIn',obj)
   }
 },

}
</script>>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin:0 auto;
   width:80%;
}
body{
  margin: 0;
  padding: 0;
}

@media screen  and (max-width: 700px){
 #app{
   margin: 0;
   width:100%;
 }
}

</style>
