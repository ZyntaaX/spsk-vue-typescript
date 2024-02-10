import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

import { useAuthenticationStore } from '@/shared/stores/authentication-store';
import { firebaseAuth } from './services/authentication/firebase-client';

import { signInWithBackend } from '@/shared/stores/authentication-store';

// import { config } from 'dotenv';

library.add(faBars, faXmark)

import i18n from "./i18n/i18n"

import App from './App.vue'
import router from './router'

// const env = config({ path: '../.env' }); // .env file
// if(env.error) {
//     console.log("ERROR");
    
// }


// import { LOCALSTORAGE_VAR } from './components/theme-switcher/theme-store';
// const scheme = localStorage.getItem(LOCALSTORAGE_VAR)?.toLowerCase();
// import(`./assets/styles/${scheme ?? 'system_default'}.css`)

import { useThemeStore } from './components/theme-switcher/theme-store';

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(createPinia());
app.use(i18n);
app.use(router);

const authStore = useAuthenticationStore();
const themeStore = useThemeStore();

themeStore.setInitialTheme();

firebaseAuth.onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in, sign in via our backend aswell.
        signInWithBackend(user.uid, user.email ?? "")
        .then((userData) => { authStore.setUser(userData) })
        .catch(() => { authStore.clearUser() })
    } else {
        // No user is signed in.
        authStore.clearUser();
    }
});

app.mount('#app');
