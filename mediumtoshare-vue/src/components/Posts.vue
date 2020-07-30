<template>
 <div class="content" >

  <Loader :isloading="loader" />
  <div class="post" v-if="!loader"> 
  <div class="tabs">
     <div class="tab" v-for="(tab,index) in tabs" :key="index" 
       :class="[
          currentTab === index ? 'activeTab' : ''
        ]"
     >
        <button v-if="tab.stats"
        v-on:click="tabHandler(index)" 
       >{{tab.name}}{{index === 2 ? tag : ''}}</button>
     </div>
  </div>
   <div v-for="(feed,index) in getItemPerPage" :key="index">
      <Tiles 
      :title="feed.title" 
      :image="feed.author.image"
      :slug="feed.slug"
      :createdDate="feed.createdAt"
      :count="feed.favoritesCount"
      :createdBy="feed.author.username"
      :isFavourite="feed.favorited"
      :description="feed.description"></Tiles>
   </div>
    <div class="Pagination">
      <Pagination 
        @page-handler="pageHandler"
        @fetchFeed="fetchFeed"
        :totalItem="totalItem"
        :isforward="isforward"
        :currentPage="currentPage" ></Pagination>
   </div>
   </div>
  
   <div class="container" v-if="!loader">
   <div class="tags">
    <span>Popular Tags</span>
     <div class="data">
        <div class="tag" v-for="(tag,index) in tagsArr" :key="index">
           <span v-on:click="tagHandler(tag)"> {{tag}} </span>
        </div>
     </div>
   </div> 
   </div>
  </div>   
</template>

<script>
import Tiles from './common/Tiles'
import Loader from './common/Loader'
import Pagination from './common/Pagination'
import {commonMethod} from './common/methods/method'

export default {
    name: 'Post',
    mixins:[commonMethod],
    components: {
      Tiles,
      Loader,
      Pagination
    },
    data(){
       return {
           PostFeed : [],
           loader: true,
           error: null,
           tags: [],
           currentPage: 1,
           itemPerPage: 10,
           limit:30,
           offset:0,
           total:29,
           isforward: true,
           currentTab: 0,
           tabs: [{ stats: true, name: 'Your Feed'}, { stats: true, name: 'Global Feed'},{ stats: false, name: '#'}],
           tag:null,
       }
    },
  methods: {
    pageHandler(page) {
      this.currentPage =  page
    },
    tagHandler(tag) {
        this.tag = tag
        this.currentTab = 2
        this.tabs[this.currentTab].stats = true
    },
    getUrl(index){
        const url = {
             0: `/articles/feed?limit=${this.limit}&offset=${this.offset}`,
             1: `/articles?limit=${this.limit}&offset=${this.offset}`,
             2: `/articles?limit=${this.limit}&offset=${this.offset}&tag=${this.tag}`
           }
          return url[index]
    },
    getData() {
        this.loader = true
        const token = this.$store.state.token
        this.axios.get(this.getUrl(this.currentTab), {headers: this.Header(token)})
          .then(({data}) =>  { 
             this.loader = false
             this.PostFeed.push(...data.articles)
          })
          .catch(({ response: { data } }) => { 
              this.loader = false
              this.error = this.ObjectToArray(data.error || ['Internal server error']) 
          })
    },
    getTags() {
          this.axios.get('/tags').then(({data}) =>{
              this.tags.push(...data.tags)
          }).catch(({ response: { data } }) => { 
              this.loader = false
              this.error = this.ObjectToArray(data.error || ['Internal server error']) 
          })
    },

    fetchFeed(type) {
      if(type === 'prev'){
          if(this.currentPage > 1) {
              if((this.currentPage -1) % 3 === 0){
                
                  this.currentPage = this.currentPage - 1,
                  this.PostFeed = this.PostFeed.slice(0,this.currentPage*this.itemPerPage)
                  this.isforward = false
                }
         else {
                    this.currentPage = this.currentPage - 1,
                    this.isforward = false    
             }
         }
      } else {
        if(this.totalItem > this.currentPage * this.itemPerPage) {
            this.currentPage = this.currentPage + 1
            this.isforward = true
        } else {
              this.offset = this.PostFeed.length + this.total
              this.loader = true
              this.currentPage = this.currentPage + 1
              this.getData()
        }
      
       }
    },
    tabHandler(index) {
        this.currentTab = index
        this.tabs[2].stats = false
    }
  },
  
  computed: {
    tagsArr() {
      return this.tags.filter((item) => item != '')
    },
    getItemPerPage() {
       const start =  (this.currentPage - 1)*this.itemPerPage
       const end =  this.itemPerPage + start
       return this.PostFeed.slice(start,end)
    },
    totalItem() {
      return this.PostFeed.length
    },  
  },

  mounted () {
         const token =  this.$store.state.token
         if(!token) {
           this.currentTab = 1;
           this.tabs[0].stats = false
         }
          this.getData()
          this.getTags()
          this.$watch('currentTab', (newV, oldVal) => {
              if(oldVal != newV){
                this.isforward = true
                this.currentPage = 1
                this.PostFeed = []
                this.offset = 0
                this.getData()
              }
          
          })
    },

    watch: {
      tag: function(newV,oldVal){
            if(newV != oldVal && newV){
              this.isforward = true
              this.currentPage = 1
              this.PostFeed = []
              this.offset = 0
              this.getData()
            }
      }
    }
}
</script>
<style scoped>
@media screen  and (max-width: 1000px){
.content{
  display: grid;
  grid-template-columns: 1fr;
  grid-gap:2rem;
  padding-top: 3rem;
  margin: 0 1rem;
  width:inherit;
  min-width: 0;
  position: relative;
  min-height: 500px;
  grid-template-rows: 1fr 14rem;
}
}
@media screen and (min-width:1000px) {
  .content{
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap:2rem;
  padding-top: 3rem;
  margin: 0 1rem;
  width:inherit;
   min-width: 0;
  min-height: 500px;
  position: relative;
}
}

.post{
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
}
.container{
  position: relative;
}
.tags{
    width: 100%;
    height: 200px;
    display: flex;
    padding: 10px;
    position: absolute;
    top: -20px;
    left: -10px;
    flex-direction: column;
    background: #f3f3f3;
}

.data{
  display: flex;
  flex-wrap: wrap;
}

.tag{
    color: #fff!important;
    font-size: .8rem;
    white-space: nowrap;
    margin-right: 3px;
    margin-bottom: .2rem;
    display: inline-block;
    background: #818a91;
    border-radius: 20%;
    padding: 0.4rem;
}
.tag:hover{
  background: darkgray;
  cursor: pointer;
}

.tabs{
  display: flex;
  justify-content: flex-start;
  border-bottom: 0.20rem solid lightgray;
  margin-bottom: 1rem;
}

.tab{
  padding-right: 1rem;
}

.tab button{
    height: 2rem;
    background: transparent;
    border: none;
    outline: none;
    text-shadow: 0.1rem 0.1rem 0.3rem lightgrey;
    font-size: 1.1rem;
    letter-spacing: 0.05rem;
    font-variant: petite-caps;
}
.activeTab {
   border-bottom: 0.20rem solid lightgray !important;
}


</style>