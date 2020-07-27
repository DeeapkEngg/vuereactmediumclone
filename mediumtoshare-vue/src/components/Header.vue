<template>
<main>
    <div class="logo">
        <router-link to="/">
            <img src="../assets/logo.png" />
        </router-link>
    </div>
    <nav>
        <ul>
             <li><router-link to="/" exact active-class="activeOne">Home</router-link></li>
             <li v-if="isloggedIn"><router-link to="/newArticle" exact active-class="activeOne"> New Article</router-link></li>
             <li v-if="isloggedIn"><router-link to="/profile" exact active-class="activeOne">Profile</router-link></li>
             <li v-if="isloggedIn"><router-link :to="'/mypage/'+username" exact active-class="activeOne">My Page</router-link></li>
             <li  v-if="!isloggedIn"><router-link to="/Auth" exact active-class="activeOne">SignIn</router-link></li>
             <li v-if="isloggedIn"><a href="#" v-on:click="logout">Logout</a></li>
        </ul>
    </nav>
</main>   
</template>

<script>

export default {
    name: 'Header',
    computed: {
    
       isloggedIn() {
         return this.$store.state.isLoggedIn
       },

       username() {
           return this.$store.state.username
       }
  
  },
  methods: {
      logout() {
           window.localStorage.removeItem('token')
           this.$store.dispatch('clearLoggedIn')
           this.$router.push('/Auth')
      }
  }

}
</script>
<style scoped>
main{
 width: 100%;
    height: 5rem;
    background-color: gray;
    margin: 0 auto;
    margin-top: 0;
    display: flex;
    box-sizing: border-box;
    box-shadow: 1rem 1rem 3rem lightgrey, -1rem -1rem 3rem lightgrey;
    background: #fff;
} 
main .logo {
 width: 6rem;
 height: 100%;
 flex: 1;
}
.logo a img {
    width: 100%;
    height: 100%;
}
main nav{
 height: 100%;
 flex:8;
}
main nav ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
}

main nav ul li {
    list-style: none;
    width: 14%;
    height: 41%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin: 1rem;
}

.activeOne {
    background: white;
   transform: scale(1.1);
   border:1px solid lightgray;
      box-shadow: 0.5rem 0.5rem 1rem lightgray;

}
main nav ul li a:hover{
   background: white;
   box-shadow: 0.5rem 0.5rem 1rem lightgray;
   transform: scale(1.1);
   padding:.075rem;
   border-top:0.01rem solid lightgray;
    border-left:0.01rem solid lightgray;
}
li > a {
    width: 100%;
    height: 100%;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    border-radius: 10%;
    transition: 0.5s;
}
</style>