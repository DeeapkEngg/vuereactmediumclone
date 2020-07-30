<template>
<main>
    <div class="logo">
        <router-link to="/">
            <img src="../assets/logo.png" />
        </router-link>
    </div>
    <div class="bar" v-on:click="toggleHandler">
      <font-awesome-icon :icon="['fa','bars']"  v-show="!toggle"/>
      <font-awesome-icon :icon="['fa','times']" v-show="toggle"/>
    </div>
    <nav :class="[show]">
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
    data() {
        return {
            toggle: false
        }
    },
    computed: {
       isloggedIn() {
         return this.$store.state.isLoggedIn
       },
       username() {
           return this.$store.state.username
       },
       show(){
           return !this.toggle ? 'toggle' : ''
       }
  },
  methods: {
      logout() {
           window.localStorage.removeItem('token')
           this.$store.dispatch('clearLoggedIn')
           this.$router.push('/Auth')
      },
      toggleHandler() {
          this.toggle =  !this.toggle
      },
 
  },

}
</script>
<style scoped>

@media screen  and (min-width: 700px){
main{
    width: 100%;
    height: 5rem;
    background-color: gray;
    margin: 0 auto;
    margin-top: 0;
    display: flex;
    box-sizing: border-box;
    box-shadow: 0.5rem 0.5rem 1rem lightgrey, -0.5rem -0.5rem 1rem lightgrey;
    background: #fff;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
} 
main .logo {
    width: 6rem;
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    
}
.logo a img {
    width: 60%;
    height: 60%;
    transition: 1s ease;
    padding: 1rem;
    
}
.logo a img:hover{
    transform: scale3d(0.9,0.9,0.9) skew(10deg,10deg) rotate(-10deg) translateX(10px);
    box-shadow: 1rem -0.75rem 2rem lightgray;
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
    text-shadow: 0.1rem 0.1rem 0.3rem lightgrey;
}
.bar{
    display: none;
}
}
@media screen  and (max-width: 700px){
    *{
        margin:0;
        padding: 0
    }
    main{
    width: 100%;
    height: 3rem;
    background-color: gray;
    margin: 0 auto;
    margin-top: 0;
    display: flex;
    box-sizing: border-box;
    box-shadow:-5rem 1rem 8rem 14px lightgrey;
    background: #fff;
    justify-content: flex-end;
    min-width: 10rem;
} 
    main .logo {
    width: 6rem;
    height: 100%;
    flex: 9;
    display: flex;
    align-items: center;
    padding-left: 1rem;
    }
    .logo a img {
        width: 3rem;
        height: 100%;
    }
    .main{
        position: relative;
    }
    nav{
        position: absolute;
        right: 0;
        background: black;
        top: 3rem;
        z-index: 999; 
    }
    nav ul {
        display: flex;
        flex-direction: column;
        width: 10rem;
    }
    nav ul li {
        width: 100%;
        height: 2rem;
        list-style: none;
        text-align: center;
        color:white;
    }
    nav ul li a{
        text-decoration: none;
        color: white;
        display: block;
        width: 100%;
        height: 100%;
        border: 1px solid black;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-shadow: 0.1rem 0.1rem 0.3rem lightgrey;
    }
    nav ul li a:hover{
         color:black;
         background:white;
    }
    .bar {
        width: 4rem;
        height: 100%;
        font-size: 2rem;
        flex:1;
    }
    .toggle{
        display: none
    }
}
</style>