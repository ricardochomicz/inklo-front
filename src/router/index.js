import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailUserGit from '../views/DetailUserGit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/detail-user/:login',
      name: 'detail-user',
      component: DetailUserGit
    }
  ]
})

export default router
