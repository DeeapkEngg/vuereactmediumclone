<template>
 <div class="content" >
   <Loader :isloading="loader" />
  <div class="post" v-if="!loader">
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
    <div class="Pagination" v-if="totalItem > 10">
      <Pagination 
        @page-handler="pageHandler"
        @fetchFeed="fetchFeed"
        :totalItem="totalItem"
        :isforward="isforward"
        :currentPage="currentPage" ></Pagination>
   </div>
   </div>
  </div>   
</template>

<script>
import Tiles from './common/Tiles'
import Loader from './common/Loader'
import Pagination from './common/Pagination'

export default {
    name: 'MyFav',
    props: {
        username: { type: String},
    },
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
           currentPage: 1,
           itemPerPage: 10,
           limit:30,
           offset:0,
           total:29,
           isforward: true,
           url: null,
       }
    },
  methods: {
    pageHandler(page) {
      this.currentPage =  page
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
              this.axios.get(this.url)
                  .then(({data}) =>  { 
                    this.loader = false
                    this.PostFeed.push(...data.articles)
                    this.currentPage = this.currentPage + 1
                  })
                  .catch(({ response: { data } }) => { 
                      this.error = data.error || 'Internal server error' 
                  })
        }
      
       }
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
    }
  },

  created () {
          
           const url = `/articles?favorited=${this.username}&limit=${this.limit}&offset=${this.offset}`    
            this.url = url
            this.axios.get(this.url)
            .then(({data}) =>  { 
                this.loader = false
                this.PostFeed.push(...data.articles)
            })
            .catch(({ response: { data } }) => { 
                this.error = data.error || 'Internal server error' 
            })

    },
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

</style>