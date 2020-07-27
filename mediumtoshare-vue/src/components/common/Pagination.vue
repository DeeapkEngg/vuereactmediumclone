<template>

     <div class="page">
        <button  
          v-on:click="clickHandler('prev')"
          class="number"> {{prevSign}}</button>
        <div  v-for="(item,index) in page" :key="index">
            <button 
               class="number" 
               v-on:click="clickHandler(item)"
               :class="[ 
               currentPage === (item) ? 'active' : '']"> {{item}} </button>
        </div>
         <button 
            v-on:click="clickHandler('next')" 
            class="number">{{nextSign}} </button>
     </div>

</template>

<script>

export default {
    name: 'Pagination',
    props: {
        currentPage: { type: Number},
        pageHandler: { type: Function},
        totalItem: { type: Number},
        isforward: {type: Boolean}
    },
    methods:{
        PageArray() {
             let x = []
             const start = this.current
             if(this.isforward){
                for(let i= start;i<=start+2;i+=1){
                    x.push(i)
                }
             } else {
                for(let i = start;i>=start-2;i -= 1){
                    x.push(i)
                 }
                x.reverse()
             }
           
            return x
        },
     clickHandler(type) {
        const ty =  typeof type
        if(ty === 'number'){
            this.$emit('page-handler', type)
        } else{
             this.$emit('fetchFeed', type)
        }
      }
    },
    watch: {
         totalItem: function(oldV, newV){
             if(oldV != newV){
                  this.current = this.currentPage
                  this.page = this.PageArray()
             }
         }
      
    },
    data(){
       return {
          pageSize: 8,
          prevSign: '<<',
          nextSign: '>>',
          current:null,
          page: []
       }
    },

   created() {
       this.current = this.currentPage
       this.page = this.PageArray()
   }

}
</script>
<style scoped>
 * {
    margin:0;
    padding: 0;
 }

 .page{
     display: flex;
     justify-content: center;
     align-items: center;
 }
 .number{
     width:2.5rem;
     height: 2.5rem;
     margin: 1rem;
     padding:0.85rem;
     display: flex;
     justify-content: center;
     align-items: center;
     background:#fff;
     border:none;
     transition: 0.5s;
     box-shadow: 0.1rem 0.1rem 0.3rem lightgray;
 }
 .number button{
     width: 100%;
     height: 100%;
     background: transparent;
 }
button:hover{
     box-shadow: 0.5rem 0.5rem 1rem lightgray;
     transform: scale(1.1);
     border:0.1rem solid lightgray;
 }
 .active {
     box-shadow: 0.5rem 0.5rem 1rem lightgray;
     transform: scale(1.1);
     border:0.1rem solid lightgray;
 }

</style>