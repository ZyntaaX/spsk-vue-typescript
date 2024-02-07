// import { AxiosPromise, AxiosRequestConfig } from 'axios';
import Api from '../api';

// type User = {
//     id: string;
//     name: string;
//     registeredAt: string; // Change to timestamp later on
// } | undefined;

export async function signInUserFromExternalAuthentication(externalID: string, email: string, token: string) : Promise<boolean> {
    try {
        await Api().post(`/user/signin-external`, { external_id: externalID, email, auth_token: token })
        .then(() => {
            console.log("Signed in successfully");
            
            return true;
        })
        .catch((error) => {
            console.log("ERROR SIGNING IN FROM API");
            
            throw error;
        })
        return true;
    } catch (err) {
        console.log("Error in API call: ", err);
        return false;
    }
}

// export async function getUserOrCreateInDB()