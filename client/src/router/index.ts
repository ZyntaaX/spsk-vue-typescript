import { createRouter, createWebHistory } from 'vue-router'

import { userExists } from './guards/beforeEnter'

import HomeView from '@/views/home-view.vue';
import SponsorsViews from '@/views/sponsors/sponsors-view.vue';
import AboutView from '@/views/about/about-view.vue';
import LinksView from '@/views/links/links-view.vue';
import AssociationCertificatesView from '@/views/association-certificates/association-certificates-view.vue';
import LoginView from '@/views/login/login-view.vue';
import UserPageView from "@/views/user/user-page-view.vue";
import BugReportView from "@/views/bug-report/bug-report-view.vue";
import FourOhFourView from "@/views/404/404-view.vue";
import SettingsView from '@/views/settings/settings-view.vue';

import { useAuthenticationStore } from '@/shared/stores/authentication-store'



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
      component: UserPageView,
      meta: {
        requiresAuth: true,
      }
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
      component: LoginView,
      
    },
    {
      path: '/bug-report',
      name: "BugReport",
      component: BugReportView,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/settings',
      name: "Settings",
      component: SettingsView,
    },
    
    /* This catchAll should always be placed as the last route-check! */
    {
      path: '/:catchAll(.*)*',
      name: '404',
      component: FourOhFourView,
    },
  ]
})

import { firebaseAuth } from '@/services/authentication/firebase-client';
// import { signInWithBackend } from '@/shared/stores/authentication-store';
import { useRouterStore } from './router-store';

// import { useAuthenticationStore } from '@/shared/stores/authentication-store'

router.beforeEach(async (to, _from, next) => {
  const routerStore = useRouterStore();
  const authStore = useAuthenticationStore();
  if (to.meta.requiresAuth) {    
    if (firebaseAuth.currentUser && authStore.isUserSignedIn) {
      // TODO: Do we really need to check backend aswell?
      // await signInWithBackend(firebaseAuth.currentUser.uid, firebaseAuth.currentUser.email ?? "")
      //   .then((result) => {
      //     if (result) {
      //       // User authorization successful
              next();
          // } else {
          //   routerStore.setIntendedRoute(to)
          //   next({ name: "LoginPage" }); 
          // }
        // })
        // .catch(() => {
        //   next({ name: "LoginPage" }); 
        // })

    } else {
      routerStore.setIntendedRoute(to)
      next({ name: "LoginPage" }); 
    }
  } else {
    // Non-protected route, allow access
    next();
  }
});

export default router
