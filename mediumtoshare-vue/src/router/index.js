import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {path: '/', component: () => import('../components/Posts.vue')},
      {path: '/post/:slug', component: () => import('../components/PostDetails.vue')},
      {path: '/Auth', component: () => import('../components/Auth.vue')},
      {path:'/newArticle', component: () => import('../components/NewArticle.vue')},
      {path:'/editArticle/:slug', component: () => import('../components/EditArticle.vue')},
      {path:'/profile', component: () => import('../components/Profile.vue')},
      {path:'/myPage/:username', component: () => import('../components/MyPage.vue')}
    ]
  },
 
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
