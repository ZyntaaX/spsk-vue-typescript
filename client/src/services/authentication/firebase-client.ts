import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';

console.log("ENV VAR: ", import.meta.env.VITE_CLIENT_PORT);
const firebaseApp = initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: `${import.meta.env.VITE_FIREBASE_APP_ID}`
});

const firebaseAuth = getAuth(firebaseApp);

export {
    firebaseApp,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    sendEmailVerification,
    firebaseAuth,
};
