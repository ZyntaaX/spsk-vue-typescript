// Import the functions you need from the SDKs you need
import admin from 'firebase-admin';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// import { getStorage, ref, getDownloadURL } from 'firebase/storage';
// import { getAuth } from 'firebase/auth';

// const firebaseApp = initializeApp({
//     apiKey: process.env.FIREBASE_APIKEY,
//     authDomain: process.env.FIREBASE_AUTHDOMAIN,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.FIREBASE_APP_ID
// });

// const firebaseAuth = getAuth(firebaseApp);

const serviceAccount = require(process.env.FIREBASE_CONFIG?.toString() ?? "")
// console.log("SERVICE ACCOUNT: ", serviceAccount);

const op = {
    credential: admin.credential.cert(serviceAccount)
}


admin.initializeApp(op);

console.log(admin.auth().listUsers())

export {
    admin as firebaseAdmin
};
