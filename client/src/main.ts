import './assets/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars, faXmark, faBug, faTerminal } from '@fortawesome/free-solid-svg-icons';
import { useAuthenticationStore } from '@/shared/stores/authentication-store';
import { firebaseAuth } from './services/authentication/firebase-client';
import { authenticateUserOnServer } from './services/user';
import i18n from "./i18n/i18n"
import App from './App.vue'
import router from './router'
import { useThemeStore } from './components/theme-switcher/theme-store';

library.add(faBars, faXmark, faBug, faTerminal)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(createPinia());
app.use(i18n);
app.use(router);

const authStore = useAuthenticationStore();
const themeStore = useThemeStore();

themeStore.setInitialTheme();

firebaseAuth.onAuthStateChanged(async function(user) {
    try {
        if (user) {
            // User is signed in, sign in via our backend aswell.
            const token = await firebaseAuth.currentUser?.getIdToken(true);
            const clientUserModel = await authenticateUserOnServer(token!, user.uid, user.email ?? "")
            authStore.setUser(clientUserModel);
        } else {
            // No user is signed in.
            authStore.clearUser();
        }
    } catch (error: any) {
        throw error?.code ?? error?.error ?? error;
    }
});

app.mount('#app');
