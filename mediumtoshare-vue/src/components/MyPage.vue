<template>
 <div class="content">
    <div class="Icon" :key="username">
       <img :src="imgSrc" />
       <span><b>{{username}}</b></span>
       <span>{{bio}}</span>
       <span class="btn"><button v-on:click="follower">
           {{btn}}
       </button></span>
    </div>
    <div class="Tabs">
       <div v-for="(tab,index) in tabs" :key="index">
          <button 
          :class="[
          currentTab === index ? 'activeTab' : '']" 
          v-on:click="Handler(index)">
            {{tab}}
          </button>
       </div>
    </div><hr/>
    <div class="TabContent">
       <div>
          <MyPost :username="username" :key="currentTab" :tab="currentTab"></MyPost>
       </div>
    </div>
 </div>
</template>

<script>
import profile from '../assets/profile.jpg'
import MyPost from './MyPost.vue'
import {myMixin} from './common/methods/method.js'

export default {
    name: 'MyPage',
    mixins:[myMixin],
    components: {
        MyPost
    },
    data(){
       return {
         imgSrc: null,
         currentTab: 0,
         username: null,
         bio:null,
         isFollow:null,
         tabs: ['My articles', 'Favourite articles']
       }
    },
    methods: {
        follower() {
           const username = this.$store.state.username
           if(username === this.username) {
               this.$router.push('/profile')
           } else {
              this.handleFollow()
           }
        },
        Header(tokenValue){
            const header = { "Content-Type": "application/json; charset=utf-8"}
            if(tokenValue) {
                header["Authorization"] =  `Token ${tokenValue}`
            }
            return header
        },
        Handler(index){
            this.currentTab = index
        },

        getData(username) {
              this.axios.get(`/profiles/${username}`)
                .then(({data}) => {
                    this.imgSrc = data.profile.image || profile
                    this.bio = data.profile.bio
                    this.isFollow = data.profile.following
                    this.username = data.profile.username
                    this.currentTab = 0
                })
        }

    },
    computed: {
     
        btn() {
            const username = this.$store.state.username
            if(username === this.username) {
                return 'Edit Profile'
            } else {
                return this.isFollow ? 'Unfollow' : 'Follow'
            }
        }
    },

    watch: {
        '$route.params.username': function (newVal, oldVal) {
                    if(oldVal !== newVal){
                        this.getData(newVal)
                    }
        }
    },

    created(){
     const username = this.$route.params.username
     this.username = username
      this.getData(this.username)
    },
   
}
</script>
<style scoped>
* {
    margin:0;
    padding: 0;
 }
.content{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 3rem;
  position: relative;
  min-height: 500px;
  box-shadow: 1rem 1rem 2rem lightgray;

}

.Icon {
    height: 12rem;
    background: lightgray;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    position: relative;
}

.btn {
    display: flex;
    width: 100%;
    position: absolute;
    bottom: 0;
    justify-content: flex-end;
    padding-right: 2rem;
    padding-bottom: 1rem;
}

.Icon img{
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
}

.Icon button {
    width: 6rem;
    height: 2rem;
    background: transparent;
    box-shadow: 0.5rem 0.5rem 1rem lightgrey;
  
}

.Tabs{
    display: flex;
    justify-content: flex-start;
    align-items: center;
      padding:0.5rem;
}
.Tabs button {
    border: none;
    background: transparent;
    margin-right: 1rem;
    transition: 0.3s;
    font-size: 1rem;
    outline: none;
}
.Tabs button:hover {
      border-bottom: 0.25rem solid lightgray !important;
}
.activeTab {
      border-bottom: 0.25rem solid lightgray !important;
}

</style>