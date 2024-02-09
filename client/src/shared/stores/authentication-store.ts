import { defineStore } from 'pinia';
import { firebaseApp, firebaseAuth, signInWithEmailAndPassword, signOut, getAuthError } from '../../services/authentication/firebase-client'
import { DateTime } from 'luxon';
import { signInUserFromExternalAuthentication } from '../../services/user'
import { computed } from 'vue';

// const firebaseAuth = getAuth(firebaseApp);

const LOCALSTORAGE_KEY_AUTH_STORES_STATE = "AUTH:STORED:STATE";

const AUTHENTICATION_STORE_ID = 'STORE:AUTHENTICATION';

export const useAuthenticationStore = defineStore(AUTHENTICATION_STORE_ID, {
    state: (): AuthenticationState => ({
        isSignedIn: JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_AUTH_STORES_STATE) ?? "{}")?.isSignedIn ?? false, // TODO: Start as true to hide login button until firestore state has been fetched
        user: JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_AUTH_STORES_STATE) ?? "{}")?.user ?? undefined,
    }),

    getters: {
        isUserSignedIn: (state) : boolean => {
            return state.isSignedIn;
        },
    },

    actions: {
        setUser(userData: UserData) : void {
            if (userData) {
                this.isSignedIn = true;
                this.user = userData;

                localStorage.setItem(LOCALSTORAGE_KEY_AUTH_STORES_STATE, JSON.stringify(this.$state))
            }
        },
        clearUser() : void {
            localStorage.removeItem(LOCALSTORAGE_KEY_AUTH_STORES_STATE)
            this.isSignedIn = false;
            this.user = undefined;

        },
        async signIn(email: string, password: string) : Promise<boolean> {
            return new Promise((resolve, reject) => {
                try {
                    signInWithEmailAndPassword(firebaseAuth, email, password)
                        .then(async (results) => {
                            // User signed in via Firebase, try our server aswell
                            await signInWithBackend(results.user.uid, email)
                                .then((userData: UserData) => {
                                    if (userData) {
                                        // Successfully logged in
                                        this.setUser(userData)
                                        resolve(true);
                                    } else {
                                        // Failed, log out from firebase
                                        signOut(firebaseAuth)
                                            .then(() => { reject(getAuthError("auth/custom-server-failed-authorization")) })
                                            .catch((error) => { reject(error) })
                                    }
                                })
                                .catch((error) => {
                                    // Failed, log out from firebase
                                    signOut(firebaseAuth)
                                        .then(() => { reject(getAuthError("auth/custom-server-failed-authorization")) })
                                        .catch((error) => { reject(error) })
                                    reject(error)
                                })
                        })
                        .catch((error) => { reject(getAuthError(error.code)) })
                } catch (error) {
                    reject(error)
                }
            })
        },
        async signOut() : Promise<boolean> {
            return new Promise((resolve, reject) => {
                signOut(firebaseAuth)
                .then(() => {
                    this.clearUser();
                    resolve(false);
                })
                .catch((error) => { reject(getAuthError(error.code)) })
            })
        }
    }
});


export async function signInWithBackend(external_id: string, email: string) : Promise<UserData> {
    return new Promise((resolve, reject) => {
        firebaseAuth.currentUser?.getIdToken(true)
            .then((async (token) => {
                // Token exists
                await signInUserFromExternalAuthentication(external_id, email, token)
                    .then((userData) => { resolve(userData as UserData); })
                    .catch((error) => reject(getAuthError(error.code)))
            }))
            .catch((error) => { reject(getAuthError(error.code)); })
    })
}

// Types
type AuthenticationState = {
    // auth: Auth;
    isSignedIn: boolean;
    user: UserData
    // user: User;
}

export type UserData = {
    id: string,
    // external_id: string,
    // email: string;
    // phone_number: string;
    // firstname: string;
    // lastname: string;
    registered_at: DateTime;
    roles: string[]
} | undefined;
