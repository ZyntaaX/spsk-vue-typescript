
import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as db from './pg/db'
import https from 'https';
import { runMigrations } from './migration/run-migrations'

// For env File 
dotenv.config();

const app: Application = express();
const port = process.env.SERVER_PORT ?? 8000;

app.use(bodyParser.json());
app.use(cors());

app.get('/status', (req: Request, res: Response) => {
  res.status(200).send("Server status is OK")
});

app.get('/user/:userid', (req: Request, res: Response) => {
  const userid: string = req.params.userid;

  res.status(200).send({
    id: userid,
    name: "Rasmus Svanberg",
    registered_at: "tomorrow?"
  });
});

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

