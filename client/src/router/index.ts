import { createRouter, createWebHistory } from 'vue-router'

import { userExists } from "./guards/beforeEnter.ts";

import HomeView from '@/views/home-view.vue';
import SponsorsViews from '@/views/sponsors/sponsors-view.vue';
import AboutView from '@/views/about/about-view.vue';
import LinksView from '@/views/links/links-view.vue';
import AssociationCertificatesView from '@/views/association-certificates/association-certificates-view.vue';
import LoginView from '@/views/login/login-view.vue';
import UserPageView from "@/views/user/user-page-view.vue";
import BugReportView from "@/views/bug-report/bug-report-view.vue";
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
      name: 'Home',
      component: HomeView
    },
    {
      path: '/user/:userid',
      name: 'UserPage',
      beforeEnter: userExists,
      component: UserPageView
    },
    {
      path: '/sponsors',
      name: 'SponsorsPage',
      component: SponsorsViews
    },
    {
      path: '/about',
      name: 'AboutPage',
      component: AboutView
    },
    {
      path: '/links',
      name: 'LinksPage',
      component: LinksView
    },
    {
      path: '/association-certificates',
      name: 'AssociationCertificatesPage',
      component: AssociationCertificatesView
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginView
    },
    {
      path: '/bug-report',
      name: "BugReport",
      component: BugReportView,
      meta: {
        requiresAuth: true,
      }
    },
    
    /* This catchAll should always be placed as the last route-check! */
    {
      path: '/:catchAll(.*)*',
      name: '404',
      component: FourOhFourView,
    },
  ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        // User is authenticated, proceed to the route
        next();
      } else {
        // User is not authenticated, redirect to login
        next('/login');
      }
    } else {
      // Non-protected route, allow access
      next();
    }
  });

export default router
