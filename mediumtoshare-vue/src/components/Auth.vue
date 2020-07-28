<template>
 <div class="content" >
   <Loader :isloading="loader" />
    <div class="Login" v-if="view === 'login'" >
       <div class="image">
        <img src="../assets/login.jpg" />
       </div>
       <div class=form>
           <div v-if="error" class="check">
            <span class="error" v-for="(error,index) in renderError" :key="index">
                {{error}}
            </span>
         </div>
          <h1>Sign In</h1>
          <input type="text" v-model="lusername" placeholder="Username">
          <input type="password" v-model="lpassword" placeholder="Password">
          <button v-on:click="submitForm($event,'login')">Login</button>
          <p>Don't have an account ? <span class="link" v-on:click="toggleView">SIGNUP </span></p>
         
       </div>
    </div>
    <div class="Register" v-if="view === 'register'" >
      
       <div class=form>
        <div class="check" v-if="error">
           <span class="error" v-for="(err,index) in renderError" :key="index">
                {{err}}
            </span>
          </div>
          <h1>Sign Up</h1>
          <input type="text" v-model="remail" placeholder="Email">
          <input type="text" v-model="rusername" placeholder="Username">
          <input type="password" v-model="rpassword" placeholder="Password">
          <button v-on:click="submitForm($event,'register')">Register</button>
          <p>Already have an account ? <span class="link" v-on:click="toggleView">SIGNIN </span></p>
      
       </div>
        <div class="image">
           <img src="../assets/logout.jpg" />
       </div>
    </div>
 </div> 
</template>

<script>
import Loader from './common/Loader'
import {commonMethod} from './common/methods/method'


export default {
    name: 'Auth',
    components: {
      Loader
    },
    mixins:[commonMethod],
    data(){
       return {
           post : null,
           loader: false,
           error: null,
           lusername:'',
           view:'login',
           lpassword:'',
           rusername: '',
           rpassword: '',
           remail: ''
       }
    },
    computed: {
          renderError() {
           return this.error
       },
    },
   methods: {
     
       toggleView() {
           this.error = null
            if(this.view === 'login'){
                 this.view = 'register'
            } else {
                this.view = 'login'
            }
       },
       submitForm($event,formType) {
            $event.preventDefault();
            this.error = ''
            if(formType === 'login') {
            this.axios.post('/users/login', {
                "user":{
                "email": this.lusername,
                "password": this.lpassword
                },})
                .then(({data}) => {
                    const obj = {
                        value : true,
                        token : data.user.token,
                        username: data.user.username
                    }
                    this.$store.dispatch('setLoggedIn',obj)
                    window.localStorage.setItem('token', data.user.token)
                    this.$router.push("/")
                })
                 .catch(({ response: { data } }) => { this.error = this.ObjectToArray(data.errors) })
            } 
             if(formType === 'register') {
            this.axios.post('/users', {
                "user":{
                "email": this.remail,
                "username": this.rusername,
                "password": this.lpassword
                },})
                .then(({data}) => {
                    const obj = {
                        value : true,
                        token : data.user.token,
                        username: data.user.username
                    }
                    this.$store.dispatch('setLoggedIn',obj)
                    window.localStorage.setItem('token', data.user.token)
                    this.$router.push("/")
                })
                 .catch(({ response: { data } }) => { this.error = this.ObjectToArray(data.errors) })
            } 
       }
   },

    mounted () {
     const token = window.localStorage.getItem('token')
      if(token){
          this.$router.push("/")
      }
    }
}
</script>
<style scoped>
 * {
    margin:0;
    padding: 0;
 }
.content {
    justify-content: center;
    align-items: center;
    position: relative;
    display: flex;
    background: #fff;
    overflow: hidden;
    margin-top:2rem;
    min-height: 600px;
}


.Login, .Register{
  width: 800px;
  box-shadow: 0px 15px 15px 5px rgba(0,0,0,0.1), 
  0px -15px 15px 5px rgba(0,0,0,0.1);
  height: 500px;
  transition: 1s;
  position: relative;
  display: flex;
}
.image{
  position: relative;
  width: 50%;
  height: 100%;
  transition: 0.5s;
} 
.image img {
   width:100%;
   height: 100%;
   object-fit: cover;
   position: absolute;
}
.form {
    position: relative;
    box-sizing: border-box;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    background-color: #fff;
    transition: 0.5s;
    flex-direction: column;
}
input, button{
    width: 100%;
    padding: 20px;
    background: #f5f5f5;
    color: #333;
    margin: 8px 0;
    font-size: 18px;
    letter-spacing: 1px;
    font-weight: 300;
    box-sizing: border-box;
    outline: none;
    border: none;
}

button{
    max-width: 100px;
    background: #677eff;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    width: 100%;
    padding:10px;
}

h1{
      text-transform: uppercase;
       text-align: center;
       font-weight: 600;
       letter-spacing: 2px;
       font-size: 18px;
       margin-bottom: 10px;
       color: #555;
}

.link{
    color: #677eff;
    font-weight: 600;
    text-decoration: none;
}
.error{
    font-size: 10px;
    color: red;
    
}
.check{
    display: flex;
   align-items: center;
   flex-direction: column;
}
 @media(max-width:991px) {
        .Login,.Register{
          max-width: 400px;
        }
        .image{
          display: none;
        }
        .form{
            width: 100%;
        }
    }
</style>