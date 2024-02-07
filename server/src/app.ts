
import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as db from './pg/db'
import https from 'https';
import { runMigrations } from './migration/run-migrations'
import { getAuth } from "firebase/auth";

import userRoutes from './routes/user-routes'

// https://firebase.google.com/docs/web/setup#available-libraries
// import { initializeApp } from 'firebase/app';

// For env File 
dotenv.config();

const app: Application = express();
const port = process.env.SERVER_PORT ?? 8000;

app.use(bodyParser.json());
app.use(cors());

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_APIKEY,
//   authDomain: process.env.FIREBASE_AUTHDOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID
// };

// Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
// // Initialize Firebase Authentication and get a reference to the service
// const auth = getAuth(firebaseApp);


// Define endpoints
app.get('/status', (req: Request, res: Response) => {
  res.status(200).send("Server status is OK")
});

app.use('/user', userRoutes);

// var httpsServer = https.createServer(app);

// Await migration before starting the server
(async () => {
  try {
      await runMigrations();
      app.listen(port, () => {
          console.log(`Server is listening at http://localhost:${port}`);
      });
  } catch (error) {
      console.error("Error while running migrations:", error);
  }
})();

