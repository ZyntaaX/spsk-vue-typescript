import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/home-view.vue';
import UserPageView from "@/views/user/user-page-view.vue";
import FourOhFourView from "@/views/404/404-view.vue";


  // route level code-splitting
  // this generates a separate chunk (About.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () => import('../views/AboutView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/user/:userid',
      name: 'UserPage',
      component: UserPageView
    },
    
    /* This catchAll should always be placed as the last route-check! */
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: FourOhFourView,
    },
  ]
})

export default router
