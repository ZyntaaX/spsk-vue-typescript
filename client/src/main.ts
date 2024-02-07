import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

import { useAuthenticationStore } from '@/shared/stores/authentication-store';
import { firebaseAuth } from './services/authentication/firebase-client';

library.add(faBars, faXmark)

import i18n from "./i18n/i18n"

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(i18n);
app.use(createPinia());
app.use(router);

firebaseAuth.onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        authStore.isSignedIn = true;
    } else {
        // No user is signed in.
        authStore.isSignedIn = false;
    }
});

const authStore = useAuthenticationStore();

app.mount('#app');
