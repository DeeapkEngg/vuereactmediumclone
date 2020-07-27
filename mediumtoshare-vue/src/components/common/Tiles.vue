<template>
    <div class="box">
         <div class="postDetails">
           <div class="firstRow">
             
               <img :src="img"/>
               <div class="userInfo">
                 <div><router-link :to="'/mypage/'+createdBy">{{createdBy}}</router-link></div>
                 <div>{{createDate}}</div>
               </div>
               <div class="like">
                 <div class="option" :class="[vcount,like]" v-on:click="handleCount()">
                  <span v-if="count === 0">
                     <font-awesome-icon :icon="['fa', 'heart']"/>
                  </span>
                  <span v-else>
                   <font-awesome-icon :icon="['fa', 'heart']"/>
                  </span>
                  <span>{{counter}}</span>
                  </div>
               </div>
              </div>
              <div class="secondRow">
              
                 <router-link :to="`/post/${slug}`"> <div class="title">{{title}}</div></router-link>
                  <router-link :to="`/post/${slug}`"><div class="description">{{description}}</div></router-link>
                 <router-link :to="`/post/${slug}`"> <div class="readmore">Read More...</div></router-link>
               
              </div>
           </div>
         </div>
</template>
<script>
import {myMixin} from './methods/method'
import Profile from '../../assets/profile.jpg'

export default {
    name: "Tiles",
    mixins:[myMixin],
    props:{
       title: { type: String, default: ''} ,
       image: {type:String, default:''},
       createdBy:{type :String, default:''},
       createdDate: {type:String, default:''},
       following: { type: Boolean, default:false},
       description: {type: String, default: ''},
       slug:{type: String, default: ''},
       count: { type: Number},
       isFavourite: {type:Boolean}
    },
    data(){
        return {
            showReadMore: false,
            createDate: null,
            img: null
        }
    },
    computed: {
        vcount() {
           return this.counter && !this.isFavs ? 'favCount': 'favNoCount'
        },
        like() {
            return this.likeProcess ? 'notAllowed' : ''
        }
    },
    
    methods:  {
            descriptionData() {
                if(this.description.length > 200){
                    this.showReadMore = true
                    return this.description.split('').slice(0,199).join('')
                } else {
                    return this.description
                }
            },
            
     },
     created() {
         const dt =  new Date(this.createdDate).toDateString()
         this.createDate = dt.split(' ').slice(1).join(',')
         this.counter = this.count
         this.isFav = this.isFavourite
         this.img = this.image || Profile
     }   
}
</script>
<style scoped>
.box{
    width: 100%;
    height: 215px;
    margin-bottom: 20px;
    padding: 20px;
    box-sizing: border-box;
    border-bottom: 2px solid lightgray;
    transition: 0.5s ease-in;
}
.box:hover{
    box-shadow: 2px 2px 20px lightgray;
}
.postDetails{
  display: flex;
  flex-direction: column;
  height: inherit;

}
.firstRow{
    display: grid;
    grid-template-columns: 40px 1fr 1fr;
    grid-template-rows: 40px;
    align-items: center;
    grid-gap: 1rem;
    margin-bottom: 1rem;
}
.userInfo{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
}
img{ 
    width:100%;
    height:100%;
    border-radius: 50%;
}
.like{
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    
}
.notAllowed{
    cursor: not-allowed !important;
}
.option{
    min-width: 50px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    border-radius: 7px;
    padding-right: 4px;
    border:1px solid green;
    cursor: pointer;
}
.option span{
    flex:1;
} 
.favCount{
    background: green;
    color: white;
}
.favNoCount{
    color: green;
}
.option:hover{
   background: green;
    color: white !important;
}
.secondRow{
    display: flex;
    flex-direction: column;
    align-content: center;
}
.title{
    font-weight: bold;
    font-size: 2rem;
    max-height: 40px;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: 10px;
}
.description{
    font-size: 1rem;
    font-weight: 600;
    height: 48px;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: 10px;

}
.readmore{
    font-size: 0.5rem;
    color:gray;
}
.secondRow a{
    text-decoration: none;
    color: black;
    cursor: pointer;
}
.userInfo a {
    text-decoration: none;
    color: lightgray;
}
.userInfo a:hover {
    text-decoration: underline;
    color: black;
}
</style>