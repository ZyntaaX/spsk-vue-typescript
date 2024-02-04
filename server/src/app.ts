
import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as db from './pg/db'

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

  const result = db.query('SELECT * FROM users', [])
  console.log("RESULT: ", result);
  

  res.status(200).send({
    id: userid,
    name: "Rasmus Svanberg",
    registered_at: "tomorrow?"
  });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
