export const myMixin = {
  data(){
    return {
        counter: null,
        isFav:null,
        likeProcess: false
    }
 },
  methods: {
        Header(tokenValue){
          const header = { 
              "Content-Type": "application/json; charset=utf-8"
          }
          if(tokenValue){
              header["Authorization"] =  `Token ${tokenValue}`
          }
          return header
      },
      handleCount(){
                
        const url = `/articles/${this.slug}/favorite`
        const token =  this.$store.state.token
        if(token){
        this.likeProcess= !this.likeProcess
        const headers = this.Header(token)
        const apiCall =  !this.isFav ? this.axios.post(url,null,{headers: headers}) : this.axios.delete(url,{headers:headers})
        apiCall.then(({data}) => {
             this.counter = data.article.favoritesCount
             this.isFav =  !this.isFav
             this.likeProcess= !this.likeProcess
        })
        .catch(() =>  {  console.log('Internal server error')
                this.likeProcess= !this.likeProcess  
         })
        }
        else{
          this.$router.push('/Auth')
        }
       
    },
    handleFollow(){
                
      const url = `/profiles/${this.username}/follow`
      const token =  this.$store.state.token
      if(token){
      const headers = this.Header(token)
      const apiCall =  !this.isFollow ? this.axios.post(url,null,{headers: headers}) : this.axios.delete(url,{headers:headers})
      apiCall.then(({data}) => {
          this.isFollow = data.profile.following
      })
      .catch(() =>  {  console.log('Internal server error')
           
       })
      }
      else{
        this.$router.push('/Auth')
      }
     
  }
  }
};