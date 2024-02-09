// import { AxiosPromise, AxiosRequestConfig } from 'axios';
import Api from '../api';
import { type UserData } from '@/shared/stores/authentication-store';

// type User = {
//     id: string;
//     name: string;
//     registeredAt: string; // Change to timestamp later on
// } | undefined;

export async function signInUserFromExternalAuthentication(external_id: string, email: string, token: string) : Promise<object> {
    return new Promise((resolve, reject) => {
        Api().post("/user/signin-external", { external_id, email, auth_token: token })
            .then((result) => {
                if (result) {
                    const { id, registered_at, roles } = result.data
                    resolve({id, registered_at, roles})
                }
            })
            .catch((error) => reject(error))
    })
    // try {
    //     await Api().post(`/user/signin-external`, { external_id: externalID, email, auth_token: token })
    //     .then(() => {
    //         console.log("Signed in successfully");
            
    //         return true;
    //     })
    //     .catch((error) => {
    //         console.log("ERROR SIGNING IN FROM API");
            
    //         throw error;
    //     })
    //     return true;
    // } catch (err) {
    //     console.log("Error in API call: ", err);
    //     return false;
    // }
}

// export async function getUserOrCreateInDB()