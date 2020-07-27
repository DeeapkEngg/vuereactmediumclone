<template>
 <div class="content" >
   <Loader :isloading="loader" />
    <p v-if="status">{{status}}</p>
    <p v-if="error">{{error}}</p>
  <div class="post" v-if="!loader">
     <ArticleTemplate 
       @handler="submitForm"
     />
 </div> 
 </div>
</template>

<script>
import ArticleTemplate from './common/ArticleTemplate' 
import Loader from './common/Loader' 
export default {
    name: 'NewArticle',
    components: {
      ArticleTemplate,
      Loader
    },
  
    data(){
       return {
           loader: false,
           error: null,
           status:null
       }
    },
   methods: {
      Header(tokenValue){
        const header = { "Content-Type": "application/json; charset=utf-8"}
        if(tokenValue) {
            header["Authorization"] =  `Token ${tokenValue}`
          }
        return header
       },
      submitForm(article) {
         const token = this.$store.state.token
         this.axios.post('articles', {article:article}, {headers: this.Header(token)})
         .then(({data}) => { 
            const article =  data.article 
            this.status = 'Article created successfully'
            setTimeout(() => {
              this.$router.push(`/post/${article.slug}`)
            } ,1000)
             }).catch((err) => {
                  console.log(err)
                  this.status = 'Internal Server Error, Please try again!'
             })
      },
   },
   
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
  width:inherit;
  min-width: 0;
  position: relative;
  min-height: 500px;
}

.post{
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    box-shadow: 5px 5px 20px lightgray;
   
}

</style>