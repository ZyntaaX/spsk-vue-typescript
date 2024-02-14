import { defineStore } from 'pinia';
import { firebaseApp, firebaseAuth, sendEmailVerification, signInWithEmailAndPassword, signOut } from '../../services/authentication/firebase-client'
import { authenticateUserOnServer } from '@/services/user';
import type { UserModel } from '@/services/user/dto/user.dto';
import * as CookieService from '@/services/cookies/cookies.service';

const COOKIE_USER_ID_KEY = 'KEY:COOKIE:USER_ID';
const COOKIE_SENT_EMAIL_VERIFICATION = 'KEY:COOKIE:SENT_EMAIL_VERIFICATION';

const AUTHENTICATION_STORE_ID = 'STORE:AUTHENTICATION';

export const useAuthenticationStore = defineStore(AUTHENTICATION_STORE_ID, {
    state: (): AuthenticationState => ({
        isSignedIn: !!CookieService.getCookie(COOKIE_USER_ID_KEY) ?? false,
        user: undefined,
    }),

    getters: {
        isUserSignedIn: (state) : boolean => {
            return state.isSignedIn;
        },
    },

    actions: {
        setUser(userData: UserModel | null) : void {
            if (userData) {
                this.isSignedIn = true;
                this.user = userData;

                CookieService.setCookie(COOKIE_USER_ID_KEY, userData.id);
            } else {
                this.clearUser()
            }
        },
        clearUser() : void {
            this.isSignedIn = false;
            this.user = undefined;

            CookieService.removeCookie(COOKIE_USER_ID_KEY);
        },
        async signIn(email: string, password: string) : Promise<boolean> {
            try {
                const results = await signInWithEmailAndPassword(firebaseAuth, email, password);
                const token = await firebaseAuth.currentUser?.getIdToken();
                const serverResults = await authenticateUserOnServer(token!, results.user.uid, email); 
                this.setUser(serverResults);
                
                return true;
            } catch (error: any) {
                if ((error?.code ?? error?.error ?? error) === 'auth/email-not-verified') {
                    const cookie = CookieService.getCookie(COOKIE_SENT_EMAIL_VERIFICATION) 
                    console.log(cookie);
                    
                    const hasSentCookie =  JSON.parse(CookieService.getCookie(COOKIE_SENT_EMAIL_VERIFICATION) ?? "false");
                    hasSentCookie.expires
                    if (firebaseAuth.currentUser && !hasSentCookie) {
                        sendEmailVerification(firebaseAuth.currentUser)
                        CookieService.setCookie(COOKIE_SENT_EMAIL_VERIFICATION, true, { expires: 1000 * 60 * 15 /* 15 minutes */ })
                    }
                }
                await this.signOut()
                throw error?.code ?? error?.error ?? error;
            }
        },
        async signOut() : Promise<boolean> {
            try {
                await signOut(firebaseAuth)
                this.clearUser();
                return true;
            } catch (error: any) {
                throw error?.code ?? error?.error ?? error;
            }
        }
    }
});

// Types
type AuthenticationState = {
    isSignedIn: boolean;
    user: UserModel
}
