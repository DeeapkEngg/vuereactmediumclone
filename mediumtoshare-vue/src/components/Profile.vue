<template>
 <div class="content" >
   <div class="post" >
    <div v-if="error" class="check">
      <span class="error" v-for="(error,index) in renderError" :key="index">
         {{error}}
      </span>
    </div>
     <form 
     @submit="Update($event)"
     >
        <div class="field">
            <div class="Data">
              <input type="pic"
               v-model="pic"
               placeholder="Enter Profile Pic URL"
               name="pic"
             />
           </div>
        </div>
         <div class="field">
            <div class="Data">
              <input type="text" 
              v-model="username"
              placeholder="Enter Username"
              name="username" />
           </div>
        </div>
         <div class="field">
            <div class="Data">
              <textarea 
              v-model="bio"
              placeholder="Enter short bio"
              name="bio"></textarea>
           </div>
        </div>
         <div class="field">
            <div class="Data">
              <input type="text" 
                v-model="email"
                placeholder="Enter Email Address"
                name="email" />
           </div>
        </div>
         <div class="field">
            <div class="Data">
              <input type="text" 
                v-model="password"
                placeholder="Enter New Password"
                name="password" />
           </div>
        </div>
        <div class="option">
           <input type="submit" value="Update" />
        </div>
     </form>
   </div>
 </div>
</template>

<script>
import {commonMethod} from './common/methods/method'
export default {
    name: 'Profile',
    mixins:[commonMethod],
    data(){
       return {
          password:"",
          email:"",
          bio:"",
          username:"",
          pic:"",
          error: null,
          status: null,
       }
    },
  methods: {
      Update($event) {
         $event.preventDefault()
         const body = {
             bio: this.bio,
             email: this.email,
             image: this.pic,
             password: this.password,
             username: this.username
         }
        const token =  this.$store.state.token
         this.axios.put('/user', {user: body}, {headers: this.Header(token)})
         .then(() => {
             this.status = "Profile updated successfully"
        })
         .catch(({ response: { data } }) => {
             this.error = data.errors ? this.ObjectToArray(data.errors) :  ['Internal server error']
         })
    },
  },

  computed: {
      renderError() {
          return this.error
      },
     
  },
  
  created () {
      const token =  this.$store.state.token
      this.axios.get('/user', {headers: this.Header(token)})
       .then(({data}) => {
           const { bio,email,image,username } =  data.user
           this.bio = bio
           this.email =  email
           this.username =  username
           this.pic =  image
       })
  }
}
</script>
<style scoped>
* {
    margin:0;
    padding: 0;
 }
.content{
  display: grid;
  grid-template-columns: 1fr;
  grid-gap:2rem;
  padding-top: 3rem;
  width:inherit;
  min-width: 0;
  position: relative;
  min-height: 500px;
}

.post{
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    padding: 2rem;
    box-shadow: 0.5rem 0.5rem 1rem lightgrey, -0.5rem -0.5rem 1rem lightgrey;
    border-radius: 1rem;
    box-sizing: border-box;
}

.option {
   display: flex;
   justify-content: center;
   align-items: center;
}
.option input {
   width: 6rem;
   height: 3rem;
   border-radius: 10%;
   background: green;
   color:white;
   transition: 1s;
   margin-right: 1rem;
}

.option input:hover{
   transform: scale(1);
   box-shadow: 1rem 1rem 2rem lightgray;
   font-size: .875rem;
}

.field{
   display: flex;
   justify-content: center;
   align-items: center;
   margin-bottom: 1rem;
}

.Data{
   flex:1;
}
.Data input,textarea {
   width: 100%;
   height:2rem;
   padding:0.4rem;
   font-size: 20px;
   border:none;
   outline: none;
   border-bottom: 1px solid gray;
}
textarea{
   height:8rem;
   resize: none;
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
</style>