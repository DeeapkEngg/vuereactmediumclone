<template>
 <div class="content" >
   <Loader :isloading="loader" />
   <p v-if="error">{{error}}</p>
  <div class="post" v-if="!loader && post">
     <div class="head">
      <h1>{{post.title}}</h1>
      <div class="user">
         <div class="userImg">
           <img :src="userImg" />
         </div>
         <div class="createDate">
            <span>{{created}}</span>
         </div>
         <div class="follow" v-if="!isloggedIn"> 
           <div class="option" v-on:click="handleFollow"  :class="[follow]">
              <font-awesome-icon :icon="['fa', 'plus']"/>
              <span>{{followBtn}}</span>
             </div>
         </div>
          <div class="favorite" v-if="!isloggedIn"> 
           <div class="option" v-on:click="handleCount" :class="[fav]">
              <font-awesome-icon :icon="['fa', 'heart']"/>
              <span>{{favoriteBtn}}({{counter}})</span>
           </div>
         </div>
            <div class="edit" v-if="isloggedIn"> 
           <div class="option" v-on:click="handleEdit"  >
              <font-awesome-icon :icon="['fa', 'pencil-alt']"/>
              <span>Edit Article</span>
           </div>
         </div>
            <div class="delete" v-if="isloggedIn"> 
           <div class="option" v-on:click="handleDelete">
              <font-awesome-icon :icon="['fa', 'trash-alt']"/>
              <span>Delete Article</span>
           </div>
         </div>
      </div>
     </div> 
      <div class="body">
        {{post.body}}
      </div>
      <hr/>
      <div class="tag"> 
        <b>Tags -</b>
        <Tag :tags="tag" />
      </div>
      <hr/>
      <div class="postCommentBox">
         <textarea></textarea>
         <div class="commentOption">
            <button>Submit</button>
         </div>
      </div>
      <hr/>
      <div class="postCommentBox"  v-for="comment in comments"  :key="comment.id">
         <textarea disabled value="comment.body"></textarea>
         <div class="comment">
           <img :src="userImg">
           <span>{{comment.author.username}}</span>
           <span>{{dateConversion(comment.createdAt)}}</span>
           <span><font-awesome-icon :icon="['fa','trash', 'Alt']" /></span>
         </div>
      </div>
  </div>   
 </div> 
</template>

<script>
import Loader from './common/Loader'
import profile from '../assets/profile.jpg'
import {myMixin} from './common/methods/method'
import Tag from './common/Tag'

export default {
    name: 'PostDetails',
    mixins:[myMixin],
    components: {
      Loader,
      Tag
    },
    computed:{
        fav(){
            return this.isFav ? 'favouriteD' : ''
        },
        favoriteBtn() {
            return this.isFav ? 'Unfavorite Article' : 'Favorite Article'
        },
        follow() {
            return this.isFollow ? 'followD' : ''
        },
        followBtn() {
            return this.isFollow ? 'Unfollow' : 'follow'
        }
    },
    data(){
       return {
           post : null,
           loader: true,
           error: null,
           userImg: null,
           created: null,
           comments: null,
           isloggedIn: false,
           username: null,
           slug:null,
           favorite:false,
           isFollow:false,
           tag: null,
       }
    },
   methods: {
    
            dateConversion(dateString) {
            const dt =  new Date(dateString).toDateString()
            return dt.split(' ').slice(1).join(' ')
            },

            handleEdit() {
               this.$router.push(`/editArticle/${this.slug}`)
            },

            handleDelete() {
            const url = `/articles/${this.slug}`
            const token = this.$store.state.token
            const headers = this.Header(token)
            this.axios.delete(url,{headers})
            .then(() =>  {
                this.$router.push('/')
            })
            .catch(({response: {data}}) => ({ error: data.error || 'Internal server error' }))
            }
  
   },

    created () {
      const slug = this.$route.params.slug
      const token =  this.$store.state.token
      if(slug){
        this.axios.get(`/articles/${slug}`, {headers: this.Header(token)})
          .then(({data}) =>  { 
             this.loader = false
             this.post = data.article
             this.username =  data.article.author.username
             this.userImg =  data.article.author.image || profile
             this.created = this.dateConversion(data.article.createdAt)
             const isAuthor =  this.$store.state.username === data.article.author.username
             this.isloggedIn = this.$store.state.isLoggedIn && isAuthor
             this.counter = data.article.favoritesCount
             this.isFav = data.article.favorited
             this.isFollow = data.article.author.following
             this.tag = data.article.tagList
             this.slug = slug
          })
          .catch(({ response: { data } }) => { 
              this.loader = false
              this.error = data.error || 'Internal server error' 
          })

      this.axios.get(`/articles/${slug}/comments`)
          .then(({data}) =>  { 
             this.comments = data.comments
          })
          .catch(({ response: { data } }) => { 
              this.error = data.error || 'Internal server error' 
          })
      }

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
.favouriteD{
    background: green;
    color: white;
}
.followD{
    background: gray;
    color: black;
}
.post{
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    box-shadow: 5px 5px 20px lightgray;
   
}

.head{
    min-height: 3rem;
    background: black;
    color: white;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    word-break: break-all;
    white-space: pre-wrap;
    box-sizing: border-box;
}
.user{
    display:grid;
    grid-template-columns: 50px 6rem 8rem 9.5rem;
    grid-template-rows: 1fr;
    grid-gap: 1rem;
}
.userImg{
    display: flex;
    justify-content: center;
    align-items: center;
}
.createDate{
  display: flex;
  align-items: center;
}
img{
    width: 60%;
    height: 100%;
    border-radius: 50%;
}
.option{
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    border: none;
    height: 100%;
    align-items: center;
    font-size: 14px;
    border-radius: 1rem;
    cursor: pointer;
    border: 1px solid white;
    transition: 1s ease-in-out;
}
.follow .option:hover{
   background:lightgray;
   color:black;
}
.favorite .option:hover{
   background:green;
   color:white;
}

.delete .option{
    border:1px solid #b85c5c;
    color: #b85c5c;
    transition: 1s ease-in-out;
    font-size: 0.875rem;
    border: 1px solid #b85c5c;
}
.delete .option:hover{
   color:white;
   background: #b85c5c;
}
.edit .option{
   background:transparent;
   color:#ccc;
   border:1px solid #ccc;
}
.edit .option:hover{
   background:#ccc;
   color:white;
}
.body{
    width: 100%;
    height: auto;
    min-height: 6rem;
    box-shadow: 5px 5px 20px lightgrey;
    margin-top: 2rem;
    padding: 1rem;
    box-sizing: border-box;
    font-family: sans-serif;
    font-size: 15px;
    font-weight: 300;
}
h1{
    margin-bottom: 1rem;
}
.postCommentBox{
    display: grid;
    box-sizing: border-box;
    grid-template-columns: 30rem;
    grid-template-rows: 200px 35px;
    justify-content: center;
    margin-top: 4rem;
    margin-bottom: 2rem;
}
textarea{
    width: 100%;
    height: 100%;
    resize: vertical;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
    resize: none;
}
.commentOption{
    background: lightgray;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 1rem;
}
.commentOption button {
    width: 6rem;
    height: 70%;
    background: green;
    color: white;
    outline:none;
    border: none;
    border-radius: 35px;
}

.comment {
    display: grid;
    grid-template-columns: 30px 1fr 1fr 1fr;
    height: 25px;
    grid-gap: 20px;
    padding:0.5rem;
    background: lightgray;
}
.comment textarea{
    resize: none;
}
.comment img{
    width: 100%;
    height: 100%
}
.comment .user {
  text-decoration: none;
  color: black;
}
.tag{
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding:1rem;
}
</style>