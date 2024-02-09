import { Router, Request, Response } from 'express';
import { queryDB } from '../pg/db'
import { firebaseAdmin } from '../firebase-server';
import { DateTime } from 'luxon';
import { PostgresError } from 'pg-error-enum';

const userRoutes = Router();

userRoutes.post('/signin-external', (req: Request, res: Response) => {
    const { external_id, email, auth_token } = req.body;

    firebaseAdmin.auth().verifyIdToken(auth_token)
        .then((decodedToken) => {
            if (!decodedToken.email_verified) {
                // TODO: Send email verification link
            }

            firebaseAdmin.auth().getUserByEmail(email)
                .catch(() => { res.status(401).send("User unauthorized.") })
                .then((results) => {
                    if (results) {
                        queryDB("SELECT id FROM USERS WHERE external_id = $1", [external_id])
                        .then(async (results) => {
                            if (results.rows.length === 0) {
                                // User does not exist in db, create it.
                                const [ firstname, lastname ] = splitEmail(email);
                                console.log('User is authorized but does not exist in database. Adding now...');
                                createUser(external_id, email, firstname, lastname)
                                    .then (() => {
                                        getUserData(external_id)
                                            .then((userData) => {
                                                res.status(200).send(userData)
                                            })
                                            .catch(() => res.status(500).send())
                                        // Return data to signed in user
                                        // db.query("SELECT id FROM users WHERE external_id = $1", [external_id])
                                        //     .then((results) => res.status(200).send({ user_id: results.rows[0].id }))
                                    })
                            } else {
                                // User already exists in DB, update last login
                                const lastLogin = DateTime.now().toISO();
                                queryDB("UPDATE users SET last_login = $1 WHERE external_id = $2",
                                [lastLogin, external_id])
                                .then(() => {
                                    getUserData(external_id)
                                        .then((userData) => {
                                            res.status(200).send(userData)
                                        })
                                        .catch(() => res.status(500).send())
                                })
                                .catch(() => { res.status(500).send() })
                            }
                        })
                        .catch(() => res.status(500).send())
                    }
                })
        })
        .catch(() => {
            res.status(401).send("User not authorized");
        })

});

async function createUser(
    external_id: string, email: string, firstname: string, lastname: string
) : Promise<void> {
    firebaseAdmin.auth().getUserByEmail(email)
        .catch(() => { console.log("User is not registered in firebase. Won't add it to DB.") })
        .then((res)=> {
            if (res) {
                const lastLogin = DateTime.now().toISO();
                
                queryDB(
                    `INSERT INTO users (external_id, email, firstname, lastname, last_login)
                    VALUES ($1, $2, $3, $4, $5)`,
                    [external_id, email, firstname, lastname, lastLogin])
                .catch((e) => {
                    if (e.code === PostgresError.UNIQUE_VIOLATION) {
                        console.log("\nCould not add user due to key UNIQUE_VIOLATION constraint.\n" +
                        "This most likely happened because user got added first time at the same time as " +
                        "client-side firebase listener tried to authorize user. Ignore this.");
                    } else {
                        console.log("Could not add user: ", e);
                    }
                })
            }
        })
}

async function getUserData(external_id: string) : Promise<UserData> {
    return new Promise((resolve, reject) => {
        queryDB("SELECT id, registered_at FROM users WHERE external_id = $1", [external_id])
            .then(({ rows }) => {
                resolve({
                    id: rows[0].id,
                    registered_at: rows[0].registered_at,
                    roles: [],
                } as UserData)
            })
            .catch((err) => reject(err))
    });
}

function splitEmail(email: string) {
    // Match the first part before the @ symbol
    const match = email.match(/([^@]+)@/);

    if (match) {
        // Split the first part by a dot to get first and last names
        const [first, last] = match[1].split('.');
        return [first, last || '']; // If last name is missing, use an empty string
    } else {
        // If the email doesn't contain a dot, assume it's just the first name
        return [email.split('@')[0], ''];
    }
}

type UserData = {
    id: string;
    registered_at: DateTime
    roles: string[]
}

export default userRoutes;
