// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import i18n from '@/i18n/i18n';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';

// import { loadEnv } from 'vite';


// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
//     authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
//     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//     appId: import.meta.env.VITE_FIREBASE_APP_ID
// };

// config();
// console.log(process.env.VITE_FIREBASE_AUTHDOMAIN);


// console.log(process.env.VITE_FIREBASE_APIKEY);
// console.log(import.meta.env.VITE_FIREBASE_APIKEY);

const firebaseApp = initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: `${import.meta.env.VITE_FIREBASE_APP_ID}`
});

const firebaseAuth = getAuth(firebaseApp);
    


interface ErrorMessageMap {
    [key: string] : string;
}

const errorMessages: ErrorMessageMap = {
    "auth/invalid-credential": i18n.global.t('error_messages.auth_invalid_credentials'),
    "auth/custom-server-failed-authorization": i18n.global.t('error_messages.auth_server_failed_auth'),
    "auth/user-disabled": i18n.global.t('error_messages.auth_account_disabled')
}

function getAuthError(errorCode: string) : string {
    return errorMessages[errorCode] ?? i18n.global.t('error_messages.auth_generic_message');
}



export {
    firebaseApp,
    // getAuth,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    sendEmailVerification,
    // type Auth
    firebaseAuth,
    getAuthError
};
