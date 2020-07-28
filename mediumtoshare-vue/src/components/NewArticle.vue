<template>
 <div class="content" >
   <Loader :isloading="loader" />
  <div class="post" v-if="!loader">
      <div v-if="error" class="check">
      <span class="error" v-for="(error,index) in renderError" :key="index">
         {{error}}
      </span>
    </div>
      <p v-if="status">{{status}}</p>
     <ArticleTemplate 
       @handler="submitForm"
     />
 </div> 
 </div>
</template>

<script>
import ArticleTemplate from './common/ArticleTemplate' 
import {commonMethod} from './common/methods/method'
import Loader from './common/Loader' 
export default {
    name: 'NewArticle',
    mixins:[commonMethod],
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

  computed: {
      renderError() {
          return this.error
      },
     
  },
   methods: {
    
      submitForm(article) {
         const token = this.$store.state.token
         this.axios.post('articles', {article:article}, {headers: this.Header(token)})
         .then(({data}) => { 
            const article =  data.article 
            this.status = 'Article created successfully'
            setTimeout(() => {
              this.$router.push(`/post/${article.slug}`)
            } ,1000)
             }).catch(({ response: { data } }) => {
                   this.error = data.errors ? this.ObjectToArray(data.errors) :  ['Internal server error']
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
    background: white;
}
.error{
    font-size: 10px;
    color: red;
    
}
.check{
    display: flex;
   align-items: center;
   flex-direction: column;
   padding: 1rem;
}

</style>