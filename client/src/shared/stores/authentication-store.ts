import { defineStore } from 'pinia';
import { firebaseApp, firebaseAuth, signInWithEmailAndPassword, signOut, getAuthError } from '../../services/authentication/firebase-client'
import { DateTime } from 'luxon';
import { signInUserFromExternalAuthentication } from '../../services/user'

// const firebaseAuth = getAuth(firebaseApp);

const AUTHENTICATION_STORE_ID = 'STORE:AUTHENTICATION';

export const useAuthenticationStore = defineStore(AUTHENTICATION_STORE_ID, {
    state: (): AuthenticationState => ({
        // auth: getAuth(firebaseApp),
        isSignedIn: true, // Start as true to hide login button until firestore state has been fetched
        user: undefined
    }),

    getters: {
        isUserSignedIn(): boolean {
            // TODO: Verify with firebase
            return true;
        }
    },

    actions: {
        async signIn(email: string, password: string) : Promise<boolean> {
            return new Promise((resolve, reject) => {
                try {
                    signInWithEmailAndPassword(firebaseAuth, email, password)
                        .then(async (results) => {
                            // User signed in via Firebase, try our server aswell
                            await signInWithBackend(results.user.uid, email)
                                .then(async (loggedIn) => {
                                    if (loggedIn) {
                                        // Successfully logged in
                                        this.isSignedIn = true;
                                        resolve(true);
                                    } else {
                                        // Failed, log out from firebase
                                        signOut(firebaseAuth)
                                            .then(() => { throw new Error("Failed to log in via postgres"); })
                                            .catch((error) => { reject(error) })
                                    }
                                })
                                .catch((error) => { reject(error) })
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
                    this.isSignedIn = false;
                    resolve(true);
                })
                .catch((error) => { reject(getAuthError(error.code)) })
            })
        }
    }
});


async function signInWithBackend(external_id: string, email: string) : Promise<boolean> {
    return new Promise((resolve, reject) => {
        resolve(true)
    })
    // try {
    //     await firebaseAuth?.currentUser?.getIdToken(true)
    //     .then(async (token) => {
    //         await signInUserFromExternalAuthentication("external_id", email, token)
    //         .then((results) => {
    //             console.log("signed in backend?", results);
    //             return true;
    //         })
    //         .catch((error) => {
    //             console.log("ERROR", error);
    //             throw error;
    //         })
    //     })
    //     .catch((err) => {
    //         throw err;
    //     })
    //     return true;
    // } catch (error) {
    //     return false;
    // }
}

// Types
type AuthenticationState = {
    // auth: Auth;
    isSignedIn: boolean;
    user: User;
}

type User = {
    id: string,
    external_id: string,
    email: string;
    phone_number: string;
    firstname: string;
    lastname: string;
    registered_at: DateTime;
} | undefined;
