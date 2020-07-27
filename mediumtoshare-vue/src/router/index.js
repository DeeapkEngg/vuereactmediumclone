import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Posts from '../components/Posts.vue'
import PostDetails from '../components/PostDetails.vue'
import Auth from '../components/Auth.vue'
import NewArticle from '../components/NewArticle.vue'
import EditArticle from '../components/EditArticle.vue'
import Profile from '../components/Profile.vue'
import MyPage from '../components/MyPage.vue'

Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    component: Home,
    children: [
      { path: '/', component: Posts},
      { path: '/post/:slug', component: PostDetails},
      { path: '/Auth', component: Auth},
      {path:'/newArticle', component: NewArticle},
      {path:'/editArticle/:slug', component: EditArticle},
      {path:'/profile', component: Profile},
      {path:'/myPage/:username', component: MyPage}
    ]
  },
 
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
