<template>
 <div class="content" >
  <div class="post" >
     <form 
     @submit="Publish($event)"
     >
        <div class="field">
           <div class="label">
              Title
           </div>
            <div class="Data">
              <input type="text"
               v-model="title"
               placeholder="Enter title of article"
               name="title"
             />
           </div>
        </div>
         <div class="field">
           <div class="label">
              Description
           </div>
            <div class="Data">
              <input type="text" 
              v-model="description"
              placeholder="Enter description of article"
              name="description" />
           </div>
        </div>
         <div class="field">
           <div class="label">
              Body
           </div>
            <div class="Data">
              <textarea 
              v-model="body"
              placeholder="Enter body of article"
              name="body"></textarea>
           </div>
        </div>
         <div class="field">
           <div class="label">
              Tags
           </div>
            <div class="Data">
              <input type="text" 
                v-model="tags"
                placeholder="Enter tags"
                name="tags" />
           </div>
        </div>
        <div class="option">
           <button v-on:click="Publish">Publish</button>
           <button v-on:click="Cancel" v-if="isEdit">Cancel</button>
        </div>
     </form>
   </div>
 </div> 
</template>

<script>

export default {
    name: 'ArticleTemplate',
    props: {
        isEdit: {
           type: Boolean,
           default: false
        },
        handler: {
           type:Function
        },
        Cancel: {
           type:Function,
           default: () => {}
        }
    },
  
    data(){
       return {
           tagArr: null,
           error: null,
           title: null,
           body: null,
           description: null,
           tags: null
       }
    },

    methods:{
       Publish($event) {
          $event.preventDefault()
          const article = {
            body: this.body,
            description: this.description,
            tagList: this.tags ? this.tags.split(',') : '',
            title:this.title
         }
          this.$emit('handler',article)
       },
         Header(tokenValue){
         const header = { "Content-Type": "application/json; charset=utf-8"}
         if(tokenValue) {
               header["Authorization"] =  `Token ${tokenValue}`
            }
         return header
         },

    },


mounted() {
      
      const slug = this.$route.params.slug
      const token = this.$store.state.token
      if(slug){
        this.axios.get(`/articles/${slug}`, {headers: this.Header(token)})
          .then(({data}) =>  { 
             this.loader = false
             this.post = data.article
             const { title,description, body, tagList } =  data.article
             this.title = title
             this.body = body
             this.description = description
             this.tags = tagList.join(',')
             this.isEdit = true
          })
          .catch(({ response: { data } }) => { 
              this.loader = false
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

.post{
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    box-shadow: 5px 5px 20px lightgray;
    padding:2rem;
   
}

.option {
   display: flex;
   justify-content: center;
   align-items: center;
}
.option button {
   width: 6rem;
   height: 3rem;
   border-radius: 10%;
   background: green;
   color:white;
   transition: 1s;
   margin-right: 1rem;
}

button:hover{
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
.label {
   flex:2;
}
.Data{
   flex:10;
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
}
</style>