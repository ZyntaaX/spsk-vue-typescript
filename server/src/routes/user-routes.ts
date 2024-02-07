import { Router, Request, Response } from 'express';
import * as db from '../pg/db'
import { firebaseAdmin } from '../firebase-server';

const userRoutes = Router();

userRoutes.post('/signin-external', (req: Request, res: Response) => {
    try {
        const { external_id, email, auth_token } = req.body;
        db.query("SELECT * FROM users WHERE external_id = $1", [external_id])
            .then((results) => {
                if (results.rows.length === 0) {
                    firebaseAdmin.auth().verifyIdToken(auth_token)
                        .then(async (decodedToken) => {
                            if (!decodedToken.email_verified) {
                                // TODO: Send email verification
                            }

                            const [firstname, lastname] = splitEmail(email);

                            await createUser(external_id, email, firstname, lastname)
                                .then(() => {
                                    res.status(200).send("OK");
                                })
                                .catch((error) => {
                                    throw error;
                                })
                        })
                        .catch((error) => {
                            throw error;
                        })
                    
                } else {
                    res.status(200).send("OK");
                }

            })
            .catch((err) => {
                throw err;
            })
    } catch (error) {
        res.status(500).send("An error occurred trying to sign in the user.")
    }
});


async function createUser(
    external_id: string, email: string, firstname: string, lastname: string
) : Promise<void> {
    await db.query(
        `INSERT INTO users (external_id, email, firstname, lastname)
        VALUES ($1, $2, $3, $4)`,
    [external_id, email, firstname, lastname])
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

export default userRoutes;
